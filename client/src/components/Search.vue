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
    <div class="join">
      <button class="join-item btn" @click="prevPage()">«</button>
      <button class="join-item btn" id="pagination-info-search">- / -</button>
      <button class="join-item btn" @click="nextpage()">»</button>
    </div>
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
