import { createRouter, createWebHistory } from "vue-router";

import NotFoundPage from "./pages/NotFound.vue";

import MainPage from "./pages/MainPage.vue";
import Projects from "./pages/Projects.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainPage },
    { path: "/progetti", component: Projects },
    { path: "/:pathMatch(.*)*", component: NotFoundPage },
  ],
});
