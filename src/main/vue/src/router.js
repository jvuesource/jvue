import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Home from "./views/Home"; // include in the main bundle
import About from "./views/About"; // include in the main bundle

let routes = [
  { path: "/", component: Home },
  { path: "/home", component: Home },
  { path: "/about", component: About }
];

/**
 * 获取router
 * @returns {VueRouter}
 */
export function createRouter() {
  return new Router({
    mode: "history", // process.env.NODE_ENV === "development" ? "hash" : "history",
    routes
  });
}
