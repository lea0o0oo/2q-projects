<script setup>
import axios from "axios";
import config from "../../config";
import utils from "../helpers/utils";
import cardTemplate from "./mainDashProjectCardTemplate";

let currentPage = 1;
let maxPages = 1;

let skeletonStuff = `<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>
<div class="skeleton" style="height: 87px"></div>`;

function loadProjects(page) {
  utils.getById("projectsContainer").innerHTML = skeletonStuff;
  axios
    .get(`${config.api.baseURL}/getProjects/?page=${page}`)
    .then((response) => {
      utils.getById("projectsContainer").innerHTML = "";
      maxPages = response.data.result.totalPages;
      utils.getById(
        "pagination-info"
      ).innerText = `${response.data.result.page} / ${response.data.result.totalPages}`;
      response.data.result.docs.forEach((doc) => {
        utils.getById("projectsContainer").innerHTML += cardTemplate(
          doc.name,
          utils.readableDate(doc.projectCreated),
          `/view/${doc._id}`
        );
      });
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
  <div>
    <h1 class="font-bold text-5xl w-full text-center mt-3">
      I nostri progetti
    </h1>
    <div class="w-full flex justify-center mt-7">
      <button
        type="button"
        class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
        style="width: 20%; min-width: 150px"
        data-hs-overlay="#modal-search"
        onclick="document.getElementById('search-focues').click()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Cerca
      </button>
    </div>
    <div style="height: 100%"></div>

    <div>
      <!-- Card Section -->
      <div
        class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto projCPrev"
      >
        <!-- Grid -->
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          id="projectsContainer"
        >
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
          <div class="skeleton" style="height: 87px"></div>
        </div>
        <!-- End Grid -->
      </div>
      <!-- End Card Section -->
    </div>
    <div class="flex w-ful justify-center">
      <div class="join">
        <button class="join-item btn" @click="prevPage()">«</button>
        <button class="join-item btn" id="pagination-info">- / -</button>
        <button class="join-item btn" @click="nextpage()">»</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1292px) {
  .projCPrev {
    height: 400px;
  }
}

@media (max-width: 1292px) {
  .projCPrev {
    height: 100%;
  }
}
/* .projCPrev {
  height: 400px;
} */
</style>
