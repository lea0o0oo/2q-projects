<script setup>
import PiediMLMLLL from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";

//document.documentElement.setAttribute("data-theme", "light");

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "k") {
    // Apri la barra di ricerca
    event.preventDefault();
    document.getElementById("projectSearch").click();
  }
});
</script>

<template>
  <div class="global-container">
    <Navbar />
    <router-view></router-view>
    <PiediMLMLLL />
  </div>
</template>
