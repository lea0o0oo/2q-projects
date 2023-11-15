<script setup>
import axios from "axios";
import config from "../../config";
import checkJWT from "../helpers/checkJWT";
import cardTemplate from "./mainDashProjectCardTemplate";
import utils from "../helpers/utils";

checkJWT();

let currentPage = 1;
let maxPages = 1;

function loadProjects(page) {
  utils.getById("card-containers").innerHTML =
    '<div class="lg:col-span-4 md:col-span-3 flex justify-center"><span class="loading loading-bars loading-lg"></span></div>';
  axios
    .get(`${config.api.baseURL}/getProjects/?page=${page}`)
    .then((response) => {
      utils.getById("card-containers").innerHTML = "";
      maxPages = response.data.result.totalPages;
      utils.getById(
        "pagination-info"
      ).innerText = `${response.data.result.page} / ${response.data.result.totalPages}`;

      response.data.result.docs.forEach((doc) => {
        document.getElementById("card-containers").innerHTML += cardTemplate(
          doc.name,
          utils.readableDate(doc.projectCreated),
          `/manage/${doc._id}`
        );
      });
      document.getElementById("card-containers").innerHTML += cardTemplate(
        "Crea progetto",
        "Crea un nuovo progetto",
        "/manage/new"
      );
    });
}

utils.onLoad(() => {
  loadProjects(1);
});

function nextpage() {
  currentPage++;
  if (currentPage >= maxPages) currentPage = maxPages;
  loadProjects(currentPage);
}

function prevPage() {
  currentPage--;
  if (currentPage <= 1) currentPage = 1;
  loadProjects(currentPage);
}
</script>

<template>
  <div style="width: 100%">
    <h1 class="w-full text-center font-bold text-4xl mb-7">Dashboard</h1>
    <div class="flex w-full justify-center">
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        style="width: 70%"
        id="card-containers"
      ></div>
    </div>
  </div>
  <div class="flex align-middle justify-center">
    <button class="btn btn-circle mb-3" @click="prevPage()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="-5 0 25 25"
        stroke="currentColor"
      >
        <g
          id="icons"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="ui-gambling-website-lined-icnos-casinoshunter"
            transform="translate(-1913.000000, -158.000000)"
            fill="currentColor"
            fill-rule="nonzero"
          >
            <g id="1" transform="translate(1350.000000, 120.000000)">
              <path
                d="M566.453517,38.569249 L577.302459,48.9938158 L577.39261,49.0748802 C577.75534,49.423454 577.968159,49.8870461 578,50.4382227 L577.998135,50.6228229 C577.968159,51.1129539 577.75534,51.576546 577.333675,51.9774469 L577.339095,51.9689832 L566.453517,62.430751 C565.663694,63.1897497 564.399001,63.1897497 563.609178,62.430751 C562.796941,61.650213 562.796941,60.3675924 563.609432,59.5868106 L573.012324,50.5572471 L563.609178,41.4129456 C562.796941,40.6324076 562.796941,39.349787 563.609178,38.569249 C564.399001,37.8102503 565.663694,37.8102503 566.453517,38.569249 Z"
                id="left"
                transform="translate(570.500000, 50.500000) scale(-1, 1) translate(-570.500000, -50.500000) "
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </button>
    <p class="mt-3 ml-2 mr-2 font-bold" id="pagination-info">- / -</p>
    <button class="btn btn-circle mb-3" @click="nextpage()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="-5 0 25 25"
        stroke="currentColor"
      >
        <g
          id="icons"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="ui-gambling-website-lined-icnos-casinoshunter"
            transform="translate(-1783.000000, -158.000000)"
            fill="currentColor"
            fill-rule="nonzero"
          >
            <g id="1" transform="translate(1350.000000, 120.000000)">
              <path
                d="M436.453517,38.569249 L447.302459,48.9938158 L447.39261,49.0748802 C447.75534,49.423454 447.968159,49.8870461 448,50.4382227 L447.998135,50.6228229 C447.968159,51.1129539 447.75534,51.576546 447.333675,51.9774469 L447.339095,51.9689832 L436.453517,62.430751 C435.663694,63.1897497 434.399001,63.1897497 433.609178,62.430751 C432.796941,61.650213 432.796941,60.3675924 433.609432,59.5868106 L443.012324,50.5572471 L433.609178,41.4129456 C432.796941,40.6324076 432.796941,39.349787 433.609178,38.569249 C434.399001,37.8102503 435.663694,37.8102503 436.453517,38.569249 Z"
                id="right"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </button>
  </div>
</template>
