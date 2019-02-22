import Vue from "vue";
import Router from "vue-router";

// 引入组件
import Home from "./views/Home";
import About from "./views/About";
import Detail from "./views/Detail";
import Category from "./views/Category";
import Login from "./views/Login";
import Register from "./views/Register";
import Search from "./views/Search";

// 要告诉 vue 使用 vueRouter
Vue.use(Router);

let routes = [
  {
    path: "/",
    name: "index-short",
    component: Home
  },
  {
    path: "/home",
    name: "index",
    component: Home
  },
  {
    path: "/auth/login",
    name: "login",
    component: Login
  },
  {
    path: "/auth/register",
    name: "register",
    component: Register
  },
  {
    path: "/s/:k",
    name: "search",
    component: Search
  },
  {
    path: "/post/:id.html",
    name: "detail",
    component: Detail
  },
  {
    path: "/p/:id.html",
    name: "detail-short",
    component: Detail
  },
  {
    path: "/category/:id",
    name: "category",
    component: Category
  },
  {
    path: "/cat/:id",
    name: "category-medium",
    component: Category
  },
  {
    path: "/c/:id",
    name: "category-short",
    component: Category
  },
  { path: "/about", name: "about", component: About }
];

/**
 * 获取router
 * @returns {VueRouter}
 */
export const createRouter = () =>
  new Router({
    mode: "history", // process.env.NODE_ENV === "development" ? "hash" : "history",
    base: process.env.BASE_URL,
    routes
  });
