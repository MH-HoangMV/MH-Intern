import Vue from "vue";
// import Router from "vue-router";
import Home from "../views/Home/Home.vue";
import VueRouter from "vue-router";
import TodoList from "@/views/Todos/TodoList.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home, name: "home" },
  {
    path: "/users",
    component: () => import("../views/Users/Users.vue"),
  },
  {
    path: "/users/:id",
    component: () => import("../views/Users/UserDetails.vue"),
  },
  {
    path: "/about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About/About.vue"),
  },
  {
    path: "/todos",
    component: TodoList,
    beforeEnter: (to, from, next) => {
      const check = window.confirm("Am I handsome?");
      if (!check) {
        next({ path: from.path });
      }
      next();
    },
  },
  {
    path: "/profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile/Profile.vue"),
    beforeEnter: (to, from, next) => {
      const access = localStorage.getItem("access");
      if (access) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Login/Login.vue"),
    beforeEnter: (to, from, next) => {
      const access = localStorage.getItem("access");
      if (!access) {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },
  {
    path: "*",
    component: () => import("../components/NotFound/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
