<script setup>
import axios from "axios";
import config from "../../config";
import utils from "../helpers/utils";
import cardTemplate from "./mainDashProjectCardTemplate";

utils.onLoad(() => {
  axios.get(`${config.api.baseURL}/getProjects`).then((response) => {
    utils.getById("projectsContainer").innerHTML = "";
    response.data.result.docs.forEach((doc) => {
      utils.getById("projectsContainer").innerHTML += cardTemplate(
        doc.name,
        utils.readableDate(doc.createdAt),
        `/view/${doc._id}`
      );
    });
  });
});
</script>

<template>
  <div style="height: calc(100vh - var(--footer-h))">
    <h1 class="font-bold text-5xl w-full text-center mt-3">
      I nostri progetti
    </h1>
    <div class="w-full flex justify-center mt-7">
      <button
        type="button"
        class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
        style="width: 20%"
        data-hs-overlay="#modal-search"
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

    <div class="mb-3">
      <label for="Quantity" class="sr-only"> Quantity </label>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
        >
          &lt;-
        </button>

        <input
          type="number"
          id="Quantity"
          value="1"
          class="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          type="button"
          class="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
        >
          ->
        </button>
      </div>
    </div>
  </div>
</template>
