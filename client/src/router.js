import { createRouter, createWebHistory } from "vue-router";

import NotFoundPage from "./pages/NotFound.vue";

import MainPage from "./pages/MainPage.vue";
import Projects from "./pages/Projects.vue";
import Login from "./pages/Auth/Login.vue";
import Register from "./pages/Auth/Register.vue";
import Dashboard from "./pages/Dashboard.vue";
import ManageProject from "./pages/ManageProject.vue";
import ViewProject from "./pages/ViewProject.vue";
import ShieldArduino from "./pages/ShieldArduino.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainPage },
    { path: "/progetti", component: Projects },
    { path: "/shield-arduino", component: ShieldArduino },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/dashboard", component: Dashboard },
    { path: "/manage/:projectId", component: ManageProject },
    { path: "/view/:projectId", component: ViewProject },

    { path: "/:pathMatch(.*)*", component: NotFoundPage },
  ],
});
