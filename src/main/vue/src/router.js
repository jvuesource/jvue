import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import About from "./views/About";

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
      path: "/about",
      name: "about",
      component: About
      // route level code-splitting
      // this generates a separate chunk (aboutpage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () =>
      //   import(/* webpackChunkName: "aboutpage" */ "./views/About.vue")
    }
  ]
});
