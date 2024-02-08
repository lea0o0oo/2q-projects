<script setup>
import config from "../../config";
import axios from "axios";
import utils from "../helpers/utils";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import Papa from "papaparse";
import Prism from "prismjs";

window.Prism = window.Prism || {};
function $(id) {
  return document.getElementById(id);
}
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function downloadFile(content, fileName, mimeType) {
  if (!mimeType) mimeType = "text/plain";
  // Create a blob object from the content
  var blob = new Blob([content], { type: mimeType });

  // Create a temporary URL for the blob
  var url = URL.createObjectURL(blob);

  // Create an anchor element
  var a = document.createElement("a");

  // Set the href and download attributes for the anchor element
  a.href = url;
  a.download = fileName;

  // Append the anchor element to the body (not strictly necessary but generally done)
  document.body.appendChild(a);

  // Trigger a click on the anchor element to start the download
  a.click();

  // Remove the anchor element from the body
  document.body.removeChild(a);

  // Revoke the temporary URL
  URL.revokeObjectURL(url);
}

function loadCSVFile(file, tableId, asText) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var csvData = asText ? file : e.target.result;

    Papa.parse(csvData, {
      header: true,
      complete: function (results) {
        var table = document.getElementById(tableId);
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        var headerRow = results.data[0];
        var dataRows = results.data.slice(1);

        if (headerRow) {
          var tableHeaderRow = document.createElement("tr");
          Object.keys(headerRow).forEach(function (key) {
            var tableHeaderCell = document.createElement("th");
            tableHeaderCell.textContent = key;
            tableHeaderRow.appendChild(tableHeaderCell);
          });

          thead.appendChild(tableHeaderRow);
        }

        dataRows.forEach(function (row) {
          if (Object.values(row).some((cell) => cell.trim() !== "")) {
            var tableRow = document.createElement("tr");
            Object.values(row).forEach(function (cell) {
              var tableCell = document.createElement("td");
              tableCell.textContent = cell;
              tableRow.appendChild(tableCell);
            });

            tbody.appendChild(tableRow);
          }
        });

        table.appendChild(thead);
        table.appendChild(tbody);
      },
    });
  };

  if (asText) {
    var blob = new Blob([file], { type: "text/csv" });
    reader.readAsText(blob);
  } else {
    reader.readAsText(file);
  }
}

const route = useRoute();
let projectData;

const monthNames = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

utils.onLoad(() => {
  axios
    .get(`${config.api.baseURL}/project/${route.params.projectId}`)
    .then((response) => {
      // console.log(response.data);
      projectData = response.data.result;

      if (
        projectData.metadata.icon == null ||
        !utils.isEmpty(projectData.metadata.icon)
      ) {
        utils.getById("project-icon").src = projectData.metadata.icon;
      }

      utils.getById("project-name").innerText = projectData.metadata.name;
      utils.getById("project-desc").innerHTML =
        projectData.metadata.description;
      const date = new Date(projectData.metadata.createdAt * 1000);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      const formattedDate = `${day} ${monthNames[month - 1]} ${year}`;
      utils.getById("project-date").innerText = formattedDate;
      utils.getById("project-image").src = projectData.content.image;
      utils.getById("project-image-fullscreen").src = projectData.content.image;

      if (utils.isEmpty(projectData.content.projectLink)) {
        utils.getById("links-div").classList.add("hidden");
      }
      utils.getById("project-iframe").src = projectData.content.iframe;
      utils.getById("htmlDIV").innerHTML = projectData.content.customHTML;
      if ((projectData.content.prose || false) == true) {
        utils.getById("htmlDIV").classList.add("prose");
        utils.getById("htmlDIV").classList.add("lg:prose-xl");
      }

      utils.getById("loadingDIV").classList.remove("flex");
      utils.getById("loadingDIV").classList.add("hidden");
      utils.getById("mainDIV").classList.remove("hidden");
      utils.getById("mainDIV").classList.add("grid");

      loadCSVFile(projectData.content.csv, "table-thing", true);

      try {
        const codeElem = $("actual-code");
        let HTMLcode = projectData.content.code.code;
        // HTMLcode = HTMLcode.replaceAll("<", "&lt;");
        // HTMLcode = HTMLcode.replaceAll("&", "&amp;");
        HTMLcode = HTMLcode.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        codeElem.innerHTML = HTMLcode;
        Prism.highlightAll();
        import("../helpers/prism");

        //$("leftidk").style.height = `calc(${$("leftidk").offsetHeight}px)`;
      } catch (e) {
        console.error(e);
      }

      // $("project-code").innerHTML = hljs.highlightAuto(
      //   projectData.content.code.code
      // ).value;

      if (
        utils.isEmpty(projectData.content.code.code) ||
        projectData.content.code.code == null
      ) {
        $("project-code").classList.add("hidden");
        $("codeContainer").classList.add("hidden");
        $("iframeContainer").classList.add("singleElem");
      }

      if (utils.isEmpty(projectData.content.iframe)) {
        utils.getById("project-iframe").classList.add("hidden");
        utils.getById("iframeContainer").classList.add("hidden");
        $("codeContainer").classList.add("singleElem");
      }
      if (utils.isEmpty(projectData.content.image)) {
        utils.getById("project-image").classList.add("hidden");
        document.getElementById("table-div").classList.add("col-span-2");
        document.getElementById("table-div").classList.add("w-full");
      }
      if (utils.isEmpty(projectData.content.csv)) {
        utils.getById("table-div").classList.add("hidden");
        document.getElementById("img-div").classList.add("col-span-2");
        document.getElementById("project-image").style.width = "70%";
      }
    })
    .catch((error) => {
      console.error(error);
      Swal.fire("Errore", error.response.data.error, "error");
    });
});

utils.onLoad(() => {
  const interval = setInterval(() => {
    utils.getById("lbl-stay").classList.remove("hidden");
    clearInterval(interval);
  }, 4000);
});

function openProjectLink() {
  window.open(projectData.content.projectLink, "_blank");
}

function modifyProject() {
  window.location.href = `/manage/${route.params.projectId}`;
}

function copyCode() {
  try {
    navigator.clipboard.writeText(projectData.content.code.code);
    Toast.fire({
      icon: "success",
      title: "Codice copiato",
    });
  } catch (e) {
    Toast.fire({
      icon: "error",
      title: "Errore",
    });
    console.error(e);
  }
}

function downloadCode() {
  try {
    let filename = projectData.metadata.name;
    filename = filename.replace(" ", "_");
    filename = filename.replace(".", "_");
    filename = filename + ".ino";
    downloadFile(projectData.content.code.code, filename);
    // Avviso
    let timerInterval;
    Swal.fire({
      title: "Download avviato",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  } catch (err) {
    Swal.fire({
      title: "Errore",
      text: "Errore durante il download, controlla la console per più info.",
      icon: "error",
    });
    console.error(err);
  }
}
</script>

<template>
  <div class="hidden">
    <p class="mt-4 hidden" id="lbl-stay">
      Potrebbe richiedere un po' di tempo...
    </p>
  </div>

  <div class="w-full mb-10">
    <div
      id="loadingDIV"
      class="grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4 grid h-full"
      style="width: 100%"
    >
      <div style="display: flex; justify-content: center">
        <div
          class="dark:bg-neutral bg-zinc-100 w-full rounded-lg lg:ml-2 md:ml-0 ml-0 h-full div-no-fll"
          style="min-height: 80vh"
        >
          <div class="ml-2 mr-2 mt-3">
            <div class="ml-2" style="display: flex; align-items: center">
              <div class="skeleton w-16 h-16 shrink-0 mask mask-squircle"></div>
              <div class="skeleton h-6 w-80 ml-3"></div>
            </div>
            <div class="divider"></div>
            <div class="skeleton h-5 w-28 mb-4"></div>
            <div class="skeleton h-4 w-full mb-2"></div>
            <div class="skeleton h-4 w-full mb-2"></div>
            <div class="skeleton h-4 w-full mb-2"></div>
            <div class="skeleton h-4 w-full mb-2"></div>

            <div class="skeleton h-5 w-28 mb-4 mt-10"></div>
            <div class="skeleton h-4 w-full mb-2"></div>

            <div class="skeleton h-5 w-28 mb-4 mt-10"></div>
            <div class="skeleton h-4 w-full mb-2"></div>
          </div>
        </div>
      </div>

      <div
        style="display: flex; justify-content: center; width: 100%"
        class="lg:col-span-3"
      >
        <div
          class="dark:bg-neutral bg-zinc-100 w-full rounded-lg h-full div-no-fll flex align-middle"
        >
          <div class="w-full">
            <div class="grid md:grid-cols-1 grid-cols-1 lg:grid-cols-2 gap-3">
              <div class="flex w-full justify-center">
                <div
                  class="skeleton w-full rounded-lg"
                  style="height: 350px; border-radius: 0.5rem"
                ></div>
              </div>

              <div
                class="overflow-x-auto h-full rouned-xl mt-4 md:mt-4 lg:mt-0"
                style="max-height: 400px"
              >
                <div class="overflow-x-auto">
                  <table class="table">
                    <!-- head -->
                    <thead>
                      <tr>
                        <th><div class="skeleton h-4 w-full mb-2"></div></th>
                        <th><div class="skeleton h-4 w-full mb-2"></div></th>
                        <th><div class="skeleton h-4 w-full mb-2"></div></th>
                        <th><div class="skeleton h-4 w-full mb-2"></div></th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- row 1 -->
                      <tr>
                        <th><div class="skeleton h-4 w-full mb-2"></div></th>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                      </tr>
                      <!-- row 2 -->
                      <tr>
                        <th><div class="skeleton h-4 w-full mb-2"></div></th>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                      </tr>
                      <!-- row 3 -->
                      <tr>
                        <th><div class="skeleton h-4 w-full mb-2"></div></th>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                        <td><div class="skeleton h-4 w-full mb-2"></div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="flex w-full justify-center mt-5">
              <div
                class="skeleton w-full"
                style="height: 400px; border-radius: 0.5rem"
              ></div>
            </div>
            <div class="w-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ... -->

    <div
      class="grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4 hidden h-full"
      style="width: 100%"
      id="mainDIV"
    >
      <div style="display: flex; justify-content: center">
        <div
          class="dark:bg-neutral bg-zinc-200 w-full rounded-lg lg:ml-2 md:ml-0 ml-0 h-full div-no-fll"
          style="min-height: 70vh"
          id="leftidk"
        >
          <div class="ml-2 mr-2 mt-3">
            <div class="ml-2" style="display: flex; align-items: center">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/000/330/430/small/2_-_1_-_Pencil.jpg"
                id="project-icon"
                class="mask mask-squircle"
                style="height: 60px"
              />
              <h3 class="font-extrabold text-3xl ml-4" id="project-name">
                [NOME]
              </h3>
            </div>
            <div class="badge badge-primary mt-5 hidden" style="display: none">
              BADGE
            </div>

            <div class="divider"></div>

            <div id="infoBox">
              <h2 class="font-bold text-2xl mt-5">Descrizione</h2>
              <pre
                class="mt-5 ml-2"
                style="white-space: pre-wrap; overflow-y: auto"
                id="project-desc"
              >
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Interdum velit euismod in pellentesque massa placerat. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Convallis convallis tellus id interdum velit laoreet id. Habitant morbi tristique senectus et netus et malesuada fames ac. Urna nunc id cursus metus aliquam eleifend mi. Odio euismod lacinia at quis risus sed. Duis at consectetur lorem donec massa sapien faucibus et. Suspendisse in est ante in nibh. Tortor aliquam nulla facilisi cras. Sit amet massa vitae tortor. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Fermentum leo vel orci porta non. Integer feugiat scelerisque varius morbi enim nunc. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Sollicitudin nibh sit amet commodo nulla facilisi. Diam sollicitudin tempor id eu.</pre
              >

              <h4 class="font-bold text-2xl mt-10">Data</h4>
              <p id="project-date">[DATA]</p>
              <div id="links-div" class="mb-3">
                <h2 class="font-bold text-2xl mt-5">Link</h2>
                <button
                  class="btn btn-success dark:btn-outline"
                  @click="openProjectLink()"
                >
                  Link del progetto
                  <svg
                    fill="currentColor"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18,10.82a1,1,0,0,0-1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8A1,1,0,0,1,5,7h7.18a1,1,0,0,0,0-2H5A3,3,0,0,0,2,8V19a3,3,0,0,0,3,3H16a3,3,0,0,0,3-3V11.82A1,1,0,0,0,18,10.82Zm3.92-8.2a1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H15a1,1,0,0,0,0,2h3.59L8.29,14.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L20,5.41V9a1,1,0,0,0,2,0V3A1,1,0,0,0,21.92,2.62Z"
                    />
                  </svg>
                </button>
              </div>
              <div id="admin-div" class="mb-3 hidden">
                <h2 class="font-bold text-2xl mt-5">Admin</h2>
                <button class="btn btn-warning" @click="modifyProject()">
                  Modifica il progetto
                  <svg
                    fill="currentColor"
                    width="20px"
                    height="20px"
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                    id="arrow"
                  >
                    <path
                      d="M8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289L14.2071 6.79289C14.5976 7.18342 14.5976 7.81658 14.2071 8.20711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L11 8.5H1.5C0.947715 8.5 0.5 8.05228 0.5 7.5C0.5 6.94772 0.947715 6.5 1.5 6.5H11L8.29289 3.70711C7.90237 3.31658 7.90237 2.68342 8.29289 2.29289Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style="display: flex; justify-content: center; width: 100%"
        class="lg:col-span-3"
        id="rightThing"
      >
        <div
          class="dark:bg-neutral bg-zinc-200 w-full rounded-lg h-full div-no-fll flex align-middle"
        >
          <div class="w-full">
            <div class="grid md:grid-cols-1 grid-cols-1 lg:grid-cols-2 gap-3">
              <div class="flex w-full justify-center" id="img-div">
                <img
                  src="https://i1.wp.com/potafiori.com/wp-content/uploads/2020/04/placeholder.png"
                  style="
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    border-radius: 0.5rem;
                  "
                  class="cursor-pointer"
                  id="project-image"
                  onclick="modal_see_img.showModal()"
                />
              </div>

              <div
                class="overflow-x-auto h-full rouned-xl mt-4 md:mt-4 lg:mt-0"
                style="max-height: 400px"
                id="table-div"
              >
                <table class="table table-zebra" id="table-thing"></table>
              </div>
            </div>
            <div class="flex w-full justify-center mt-5">
              <div
                class="grid lg:grid-cols-2 grid-cols-1 gap-3 w-full"
                style="height: 60vh"
              >
                <div id="iframeContainer" class="w-full">
                  <iframe
                    id="project-iframe"
                    style="width: 100%; min-height: 60vh; border-radius: 0.5rem"
                    src=""
                  />
                </div>
                <div id="codeContainer" class="w-full flex">
                  <div
                    id="project-code"
                    class="dark:bg-zinc-700 bg-gray-300"
                    style="width: 100%; height: 56vh; border-radius: 0.5rem"
                  >
                    <div class="flex mb-2 mt-2" id="ee">
                      <button class="btn btn-xs mr-2 ml-1" @click="copyCode()">
                        Copia
                      </button>
                      <button class="btn btn-xs" @click="downloadCode()">
                        Scarica
                      </button>
                    </div>

                    <pre
                      class="rounded-xl arduino-code dark:border-zinc-500 border-zinc-700 border-2 line-numbers"
                      style="width: 100%; height: 56vh; overflow-y: auto"
                    ><code style="width: 100%; height: 100%; overflow-y: auto; " class="language-arduino rounded-xl" id="actual-code">const int a = 123;</code></pre>
                  </div>
                </div>
              </div>
            </div>
            <div id="htmlDIV" class="w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Open the modal using ID.showModal() method -->
  <dialog id="modal_see_img" class="modal">
    <div class="modal-box" style="min-width: 50%">
      <img
        src="https://i1.wp.com/potafiori.com/wp-content/uploads/2020/04/placeholder.png"
        style="width: 100%; height: auto"
        class="rounded-xl"
        id="project-image-fullscreen"
      />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>
.singleElem {
  @apply lg:col-span-2;
}

@media (prefers-color-scheme: dark) {
  .arduino-code {
    background-color: #22272e;
  }
}

@media (prefers-color-scheme: light) {
  .arduino-code {
    background-color: white;
  }
}

@media only screen and (max-width: 1000px) {
  .div-no-fll {
    width: 95%;
  }
}

@media only screen and (min-width: 1000px) {
  .div-no-fll {
    width: 100%;
  }
}
</style>
