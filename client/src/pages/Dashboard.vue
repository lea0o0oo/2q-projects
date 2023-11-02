<script setup>
import axios from "axios";
import config from "../../config";
import checkJWT from "../helpers/checkJWT";
import cardTemplate from "./cardTemplate";
import utils from "../helpers/utils";

checkJWT();

axios.get(`${config.api.baseURL}/getProjects/?page=1`).then((response) => {
  document.getElementById("loadingDIV").classList.add("hidden");
  console.log(response.data);
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
</script>

<template>
  <div style="height: calc(100vh - var(--footer-h)); width: 100%">
    <h1 class="w-full text-center font-bold text-4xl mt-3">Dashboard</h1>
    <div class="flex w-full justify-center mt-10" id="loadingDIV">
      <span class="loading loading-bars loading-lg"></span>
    </div>
    <div class="flex w-full justify-center">
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        style="width: 70%"
        id="card-containers"
      ></div>
    </div>
  </div>
</template>
