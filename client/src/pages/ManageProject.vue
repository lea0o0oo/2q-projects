<script setup>
import utils from "../helpers/utils";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import checkJWT from "../helpers/checkJWT";

checkJWT();

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const router = useRoute();
let projectStructure = {
  metadata: {
    name: "",
    description: "",
    createdAt: 1234567890,
    icon: "",
  },
  content: {
    projectLink: "",
    image: "",
    iframe: "",
    customHTML: "",
  },
};

function prgIconDefault() {
  document.getElementById("project-icon").src =
    "https://static.vecteezy.com/system/resources/thumbnails/000/330/430/small/2_-_1_-_Pencil.jpg";
}

utils.onLoad(() => {
  if (router.params.projectId != "new") {
    utils.getById("modal_loading").checked = true;

    axios
      .get(`${config.api.baseURL}/project/${router.params.projectId}`)
      .then((response) => {
        let projectData = response.data.result;

        const unixTimestamp = projectData.metadata.createdAt;
        const datePicker = document.getElementById("project-date");
        const date = new Date(unixTimestamp * 1000);

        // Format the date in the desired format
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const formattedDate = `${year}-${month}-${day}`;

        datePicker.value = formattedDate;

        utils.getById("project-name").value = projectData.metadata.name;
        utils.getById("project-desc").value = projectData.metadata.description;
        document.getElementById("project-icon").src = projectData.metadata.icon
          ? projectData.metadata.icon
          : document.getElementById("project-icon").src;
        utils.getById("project-link").value = projectData.content.projectLink;
        document.getElementById("project-image").src = projectData.content.image
          ? projectData.content.image
          : document.getElementById("project-image").src;

        document.getElementById("image-fullscreen").src =
          document.getElementById("project-image").src;
        utils.getById("project-html").value = projectData.content.customHTML;
        utils.getById("project-iframe").value = projectData.content.iframe;
        loadCSVFile(projectData.content.csv, "tableCSV", true);

        utils.getById("modal_loading").checked = false;
      });
  }
});

utils.onLoad(() => {
  const iconImagePicker = document.getElementById("project-icon-picker");
  const iconPreviewImage = document.getElementById("project-icon");
  const imagePicker = document.getElementById("project-image-picker");
  const previewImage = document.getElementById("project-image");

  iconImagePicker.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      iconPreviewImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
  imagePicker.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      previewImage.src = e.target.result;
      document.getElementById("image-fullscreen").src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
});
let projectIcon;
let projectImage;
let iconData;
let imageData;
let globalCsvData = "";

utils.onLoad(() => {
  projectIcon = document.getElementById("project-icon");
  projectImage = document.getElementById("project-image");
});

async function fetchIconData() {
  if (
    projectIcon.src ==
    "https://static.vecteezy.com/system/resources/thumbnails/000/330/430/small/2_-_1_-_Pencil.jpg"
  ) {
    iconData = "";
  } else {
    const response = await fetch(projectIcon.src);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    iconData = await new Promise((resolve) => {
      reader.onload = () => {
        const base64DataUrl = reader.result;
        resolve(new String(base64DataUrl).toString());
      };
    });
  }
}
async function fetchImageData() {
  if (
    projectImage.src ==
    "https://i1.wp.com/potafiori.com/wp-content/uploads/2020/04/placeholder.png"
  ) {
    imageData = "";
  } else {
    const response = await fetch(projectImage.src);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    imageData = await new Promise((resolve) => {
      reader.onload = () => {
        const base64DataUrl = reader.result;
        resolve(new String(base64DataUrl).toString());
      };
    });
  }
}

async function save() {
  let canContinue = true;
  if (utils.isEmpty(utils.getById("project-name").value)) canContinue = false;
  if (utils.isEmpty(utils.getById("project-desc").value)) canContinue = false;
  if (utils.isEmpty(utils.getById("project-date").value)) canContinue = false;
  if (!canContinue) {
    Swal.fire(
      "Campi mancanti",
      "Completa tutti i campi nel 'Metadata' per continuare",
      "warning"
    );
    return;
  }
  const dateValue = utils.getById("project-date").value;
  const created = new Date(dateValue);
  const createdTimestamp = created.getTime() / 1000;

  await fetchIconData();
  await fetchImageData();
  console.log(globalCsvData);

  projectStructure = {
    metadata: {
      name: utils.getById("project-name").value,
      description: utils.getById("project-desc").value,
      createdAt: createdTimestamp,
      icon: iconData,
    },
    content: {
      projectLink: utils.getById("project-link").value,
      image: imageData,
      iframe: utils.getById("project-iframe").value,
      customHTML: utils.getById("project-html").value,
      csv: globalCsvData,
    },
  };

  utils.getById("save-btn").innerHTML =
    '<span class="loading loading-bars loading-md"></span>' +
    utils.getById("save-btn").innerHTML;
  utils.getById("save-btn").disabled = true;
  if (router.params.projectId == "new") {
    axios
      .post(
        `${config.api.baseURL}/createProject`,
        {
          projectData: projectStructure,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.error, "error");
      })
      .finally(() => {
        utils.getById("save-btn").innerHTML = "Save";
        utils.getById("save-btn").disabled = false;
      });
  } else {
    axios
      .post(
        `${config.api.baseURL}/updateProject`,
        {
          projectData: projectStructure,
          projectId: router.params.projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: "Salvato",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", error.response.data.error, "error");
      })
      .finally(() => {
        utils.getById("save-btn").innerHTML = "Save";
        utils.getById("save-btn").disabled = false;
      });
  }
}

function loadCSVFile(file, tableId, asText) {
  document.getElementById(tableId).innerHTML = "";
  var reader = new FileReader();

  reader.onload = function (e) {
    var csvData = asText ? file : e.target.result;
    var rows = csvData.split("\n");
    globalCsvData = csvData;

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

utils.onLoad(() => {
  // Usage example
  var fileInput = document.getElementById("project-csv-picker");
  fileInput.addEventListener("change", function (e) {
    var file = e.target.files[0];
    loadCSVFile(file, "tableCSV");
  });
});

function delProject() {
  Swal.fire({
    title: "Sei sicuro?",
    text: "Questa azione è irreversibile",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Continua",
  }).then((result) => {
    if (result.isConfirmed) {
      utils.getById("modal_loading").checked = true;
      axios
        .delete(`${config.api.baseURL}/deleteProject`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            projectId: router.params.projectId,
          },
        })
        .then((response) => {
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.error(error);
          utils.getById("modal_loading").checked = false;
          Swal.fire("Errore", error.response.data.error, "error");
        });
    }
  });
}
</script>

<template>
  <div class="w-full mb-10">
    <h1 class="w-full text-center font-bold text-4xl">Gestisci progetto</h1>
    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4"
      style="width: 99.5%"
    >
      <div class="dark:bg-neutral bg-zinc-200 w-full rounded-lg lg:ml-2">
        <div class="ml-2 mr-2">
          <h3 class="font-bold text-2xl w-full text-center mt-2">Metadata</h3>
          <div class="divider"></div>
          <h4 class="font-bold text-xl">Nome progetto</h4>
          <input
            type="text"
            placeholder=""
            class="input input-bordered w-full input-primary"
            id="project-name"
          />
          <h4 class="font-bold text-xl">Descrizione</h4>
          <textarea
            class="textarea textarea-warning w-full"
            id="project-desc"
            placeholder=""
            style="height: 200px"
          ></textarea>

          <h4 class="font-bold text-xl mt-3">Data creazione</h4>
          <input type="date" class="w-full input" id="project-date" />

          <h4 class="font-bold text-xl mt-3">Icona</h4>
          <div class="flex w-full justify-center">
            <div class="avatar">
              <div class="w-16 rounded-full">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/000/330/430/small/2_-_1_-_Pencil.jpg"
                  id="project-icon"
                />
              </div>
            </div>
          </div>

          <div class="flex">
            <input
              id="project-icon-picker"
              type="file"
              class="file-input file-input-bordered w-full mb-3 mt-3"
              accept=".png .jpg .gif .apng .jpeg .webp"
            />
            <button class="btn mt-3 ml-2" @click="prgIconDefault()">
              Default
            </button>
          </div>
        </div>
      </div>
      <div class="dark:bg-neutral bg-zinc-200 w-full rounded-lg lg:col-span-3">
        <h3 class="font-bold text-2xl w-full text-center mt-2">Contenuto</h3>
        <div class="divider"></div>
        <div class="ml-2 mr-2">
          <div
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 w-full"
          >
            <div>
              <p class="font-bold text-xl mb-2">Link progetto</p>
              <div class="form-control w-full">
                <input
                  type="text"
                  placeholder="https://"
                  class="input input-bordered w-full input-primary"
                  id="project-link"
                />
              </div>
            </div>
            <div>
              <p class="font-bold text-xl mb-2">Immagini</p>
              <input
                type="file"
                class="file-input file-input-bordered w-full mb-3 input-secondary"
                accept=".png .jpg .gif .apng .jpeg .webp"
                id="project-image-picker"
              />
              <img
                src="https://i1.wp.com/potafiori.com/wp-content/uploads/2020/04/placeholder.png"
                style="width: 100%; height: auto"
                class="mb-2 rounded-xl cursor-pointer"
                id="project-image"
                onclick="modal_see_img.showModal()"
              />
            </div>
            <div>
              <p class="font-bold text-xl mb-2">Iframe</p>
              <input
                type="text"
                placeholder="https://"
                class="input input-bordered w-full input-success"
                id="project-iframe"
              />
            </div>
            <div>
              <p class="font-bold text-xl mb-2">Tabella CSV</p>
              <input
                type="file"
                class="file-input file-input-bordered w-full mb-3 input-primary"
                accept=".csv"
                id="project-csv-picker"
              />
              <div class="overflow-x-auto" style="max-height: 400px">
                <table class="table table-zebra" id="tableCSV">
                  <!-- head -->
                </table>
              </div>
            </div>
            <div>
              <p class="font-bold text-xl mb-2">Salva</p>
              <button
                class="btn btn-block btn-accent"
                @click="save()"
                id="save-btn"
              >
                Salva
              </button>
            </div>
            <div>
              <p class="font-bold text-xl mb-2">Elimina</p>
              <button
                class="btn btn-block btn-error"
                @click="delProject()"
                id="save-btn"
              >
                Elimina
              </button>
            </div>
          </div>

          <div class="divider"></div>
          <h4>HTML Custom</h4>
          <p>// TODO: Sostituire la textArea con CodeMirror</p>
          <textarea
            class="textarea textarea-secondary w-full h-full"
            style="min-height: 300px"
            placeholder="<h1>aa</h1>"
            id="project-html"
          ></textarea>
        </div>
      </div>
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
        id="image-fullscreen"
      />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="modal_loading" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <div class="flex w-full justify-center">
        <span class="loading loading-bars loading-lg"></span>
      </div>
      <div class="flex w-full justify-center mt-4">
        <p>Caricamento</p>
      </div>
    </div>
  </div>
</template>
