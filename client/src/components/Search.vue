<script setup>
import utils from "../helpers/utils";
import cardTemplate from "../pages/cardTemplate";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";

let currentPage = 1;
let maxPages = 1;
let currentQuery = "";
let isSearching = false;

let skeletonStuff = `<div class="skeleton mb-2" style="height: 87px"></div>
<div class="skeleton mb-2" style="height: 87px"></div>
<div class="skeleton mb-2" style="height: 87px"></div>
<div class="skeleton mb-2" style="height: 87px"></div>
<div class="skeleton mb-2" style="height: 87px"></div>
<div class="skeleton mb-2" style="height: 87px"></div>`;

function $(id) {
  return document.getElementById(id);
}

function startSearch(query, page, nodisable) {
  if (!isSearching) {
    isSearching = true;
    if (!nodisable) utils.getById("input-search").disabled = true;
    if (!nodisable) utils.getById("input-search").blur();
    //console.log("richiesta");
    utils.getById("search-results").innerHTML = skeletonStuff;
    axios
      .get(`${config.api.baseURL}/getProjects/?page=${page}&limit=6&q=${query}`)
      .then((response) => {
        utils.getById("search-results").innerHTML = "";
        maxPages = response.data.result.totalPages;
        utils.getById(
          "pagination-info-search"
        ).innerText = `${response.data.result.page} / ${response.data.result.totalPages}`;
        response.data.result.docs.forEach((doc) => {
          utils.getById("search-results").innerHTML += cardTemplate(
            doc.name,
            utils.readableDate(doc.projectCreated),
            `/view/${doc._id}`
          );
        });
        if (response.data.result.docs.length == 0) {
          utils.getById("search-results").innerHTML =
            '<h2 class="w-full text-center font-bold text-3xl">Nessun risultato</h2>';
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Errore", "Controlla la console per più info", "error");
      })
      .finally(() => {
        isSearching = false;
        utils.getById("input-search").disabled = false;
        if (!utils.onMobile) utils.getById("input-search").focus();
      });
  }
}

utils.onLoad(() => {
  utils.getById("search-focues").addEventListener("change", () => {
    startSearch("", 1, true);
    utils.getById("input-search").value = "";
    setTimeout(() => {
      if (!utils.onMobile) utils.getById("input-search").focus();
    }, 200);
  });
  utils.getById("input-search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      currentPage = 1;
      currentQuery = utils.getById("input-search").value;
      startSearch(utils.getById("input-search").value, currentPage);
    }
  });
});

function nextpage() {
  currentPage++;
  if (currentPage >= maxPages) currentPage = maxPages;
  startSearch(currentQuery, currentPage);
}

function prevPage() {
  currentPage--;
  if (currentPage <= 1) currentPage = 1;
  startSearch(currentQuery, currentPage);
}
</script>

<template>
  <input
    type="text"
    class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
    placeholder="Cerca..."
    id="input-search"
  />
  <div class="divider rounded-full"></div>
  <div id="search-results" class="search-results">
    <div class="flex w-full justify-center">
      <div class="skeleton mb-2" style="height: 87px"></div>
      <div class="skeleton mb-2" style="height: 87px"></div>
      <div class="skeleton mb-2" style="height: 87px"></div>
      <div class="skeleton mb-2" style="height: 87px"></div>
      <div class="skeleton mb-2" style="height: 87px"></div>
      <div class="skeleton mb-2" style="height: 87px"></div>
    </div>
  </div>
  <!-- ... -->
  <div class="flex align-middle justify-center mt-5">
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
    <p class="mt-3 ml-2 mr-2 font-bold" id="pagination-info-search">- / -</p>
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

<style scoped>
@media (min-height: 828px) {
  #search-results {
    height: 570px;
  }
}

@media (max-height: 828px) {
  #search-results {
    height: 50vh;
    overflow-y: auto;
  }
}
</style>
