import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Dashboard from "./pages/Dashboard.vue";
import Chatbot from "./pages/Chatbot.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard },
  {path : "/chat", component: Chatbot }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
