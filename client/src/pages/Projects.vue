<script setup>
import axios from "axios";
import config from "../../config";
import utils from "../helpers/utils";
import cardTemplate from "./mainDashProjectCardTemplate";

let currentPage = 1;
let maxPages = 1;

function loadProjects(page) {
  utils.getById("projectsContainer").innerHTML =
    '<div class="lg:col-span-4 md:col-span-3 flex justify-center"><span class="loading loading-bars loading-lg"></span></div>';
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
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <!-- Grid -->
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          id="projectsContainer"
        >
          <div class="lg:col-span-4 md:col-span-3 flex justify-center">
            <span class="loading loading-bars loading-lg"></span>
          </div>
        </div>
        <!-- End Grid -->
      </div>
      <!-- End Card Section -->
    </div>
    <div class="flex w-ful justify-center">
      <!--
  This component uses @tailwindcss/forms

  yarn add @tailwindcss/forms
  npm install @tailwindcss/forms

  plugins: [require('@tailwindcss/forms')]

  @layer components {
    .no-spinner {
      -moz-appearance: textfield;
    }

    .no-spinner::-webkit-outer-spin-button,
    .no-spinner::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }
  }
-->

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
    </div>
  </div>
</template>
