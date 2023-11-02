<script setup>
import config from "../../config";
import axios from "axios";
import utils from "../helpers/utils";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

function loadCSVFile(file, tableId, asText) {
  document.getElementById(tableId).innerHTML = "";
  var reader = new FileReader();

  reader.onload = function (e) {
    var csvData = asText ? file : e.target.result;
    var rows = csvData.split("\n");

    var table = document.getElementById(tableId);
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    var headerRow = rows[0].split(",");
    var dataRows = rows.slice(1);

    var tableHeaderRow = document.createElement("tr");
    headerRow.forEach(function (cell) {
      var tableHeaderCell = document.createElement("th");
      tableHeaderCell.textContent = cell;
      tableHeaderRow.appendChild(tableHeaderCell);
    });

    thead.appendChild(tableHeaderRow);

    dataRows.forEach(function (row) {
      var cells = row.split(",");
      var tableRow = document.createElement("tr");

      cells.forEach(function (cell) {
        var cellValue = cell.replace(/^"(.*)"$/, "\$1");

        var tableCell = document.createElement("td");
        tableCell.textContent = cellValue;
        tableRow.appendChild(tableCell);
      });

      tbody.appendChild(tableRow);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
  };

  if (asText) {
    reader.onload(null);
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
      console.log(response.data);
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

      utils.getById("loadingDIV").classList.remove("flex");
      utils.getById("loadingDIV").classList.add("hidden");
      utils.getById("mainDIV").classList.remove("hidden");
      utils.getById("mainDIV").classList.add("grid");

      loadCSVFile(projectData.content.csv, "table-thing", true);

      if (utils.isEmpty(projectData.content.iframe)) {
        utils.getById("project-iframe").classList.add("hidden");
      }
      if (utils.isEmpty(projectData.content.image)) {
        utils.getById("project-image").classList.add("hidden");
        document.getElementById("table-div").classList.add("col-span-2");
        document.getElementById("table-div").classList.add("w-full");
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
</script>

<template>
  <div class="w-full mb-10">
    <div id="loadingDIV" class="flex w-full justify-center" style="">
      <div>
        <div class="flex w-full justify-center">
          <span class="loading loading-bars loading-lg"></span>
        </div>
        <p class="mt-4 hidden" id="lbl-stay">
          Potrebbe richiedere un po' di tempo...
        </p>
      </div>
    </div>
    <div
      class="grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4 hidden h-full"
      style="width: 99.5%"
      id="mainDIV"
    >
      <div
        class="dark:bg-neutral bg-zinc-200 w-full rounded-lg lg:ml-2 h-full"
        style="min-height: 80vh"
      >
        <div class="ml-2 mr-2 mt-3">
          <div class="flex ml-2">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/330/430/small/2_-_1_-_Pencil.jpg"
              id="project-icon"
              class="mask mask-squircle"
              style="height: 60px"
            />
            <h3
              class="font-extrabold text-3xl ml-4"
              id="project-name"
              style="margin-top: 12px"
            >
              [NOME]
            </h3>
          </div>
          <div class="divider"></div>

          <pre
            class="mt-5 ml-2"
            style="white-space: pre-wrap; overflow-y: auto; max-height: 30vh"
            id="project-desc"
          >
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Interdum velit euismod in pellentesque massa placerat. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Convallis convallis tellus id interdum velit laoreet id. Habitant morbi tristique senectus et netus et malesuada fames ac. Urna nunc id cursus metus aliquam eleifend mi. Odio euismod lacinia at quis risus sed. Duis at consectetur lorem donec massa sapien faucibus et. Suspendisse in est ante in nibh. Tortor aliquam nulla facilisi cras. Sit amet massa vitae tortor. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Fermentum leo vel orci porta non. Integer feugiat scelerisque varius morbi enim nunc. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Sollicitudin nibh sit amet commodo nulla facilisi. Diam sollicitudin tempor id eu.</pre
          >

          <h4 class="font-bold text-xl mt-10">Data</h4>
          <p id="project-date">[DATA]</p>
          <div id="links-div" class="mb-3">
            <h2 class="font-bold text-3xl mt-5">Link</h2>
            <button class="btn" @click="openProjectLink()">
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
        </div>
      </div>
      <div
        class="dark:bg-neutral bg-zinc-200 w-full rounded-lg lg:col-span-3 h-full flex align-middle h-full"
      >
        <div>
          <div class="grid md:grid-cols-1 grid-cols-1 lg:grid-cols-2 gap-3">
            <div class="flex w-full justify-center">
              <img
                src="https://i1.wp.com/potafiori.com/wp-content/uploads/2020/04/placeholder.png"
                style="width: 100%; height: auto; object-fit: cover"
                class="rounded-xl cursor-pointer"
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
            <iframe
              id="project-iframe"
              style="width: 100%; height: 500px"
              src=""
              class="w-full h-full rounded-xl"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </div>

      <div id="htmlDIV" class="w-full"></div>
    </div>
  </div>

  <!-- Open the modal using ID.showModal() method -->
  <dialog id="modal_see_img" class="modal">
    <div class="modal-box" style="min-width: 50%">
      <h3 class="font-bold text-lg mb-2">Anteprima</h3>
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
