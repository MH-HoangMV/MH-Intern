import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home/Home.vue";
import VueRouter from "vue-router";
import TodoList from "@/components/Todos/TodoList.vue";

Vue.use(Router);

const routes = [
  { path: "/", component: Home },
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
      // console.log(to, from);
      if (!check) {
        next({ path: from.path });
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
