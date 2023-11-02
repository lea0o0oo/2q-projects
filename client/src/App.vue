<script setup>
import PiediMLMLLL from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";

//document.documentElement.setAttribute("data-theme", "light");
</script>

<template>
  <div class="global-container">
    <Navbar />
    <router-view></router-view>
    <PiediMLMLLL />
  </div>
</template>
