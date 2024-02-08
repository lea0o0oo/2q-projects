import { createApp } from "vue";
import "./styles.css";
import "./tailwind.css";
//import "./hljs.css";
import "./prism.css";
import App from "./App.vue";
import { router } from "./router";

createApp(App).use(router).mount("#app");
