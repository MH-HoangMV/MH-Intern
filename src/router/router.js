import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home/Home.vue";
import About from "../views/About/About.vue";
import VueRouter from "vue-router";

Vue.use(Router);

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = new VueRouter({
  mode: "history", //
  routes,
});

export default router;
