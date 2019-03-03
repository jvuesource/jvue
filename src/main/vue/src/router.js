import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import About from "./views/About";
import Detail from "./views/Detail";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
      // component: () =>
      //   import(/* webpackChunkName: "homepage" */ "./views/Home.vue")
    },
    {
      path: "/home",
      name: "home-long",
      component: Home
    },
    {
      path: "/s",
      name: "search",
      component: Home
    },
    {
      path: "/s/:k",
      name: "search",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
      // route level code-splitting
      // this generates a separate chunk (aboutpage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () =>
      //   import(/* webpackChunkName: "aboutpage" */ "./views/About.vue")
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
    }
  ]
});
