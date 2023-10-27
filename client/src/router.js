import { createRouter, createWebHistory } from "vue-router";

import NotFoundPage from "./pages/NotFound.vue";

import MainPage from "./pages/MainPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: MainPage }],
});
