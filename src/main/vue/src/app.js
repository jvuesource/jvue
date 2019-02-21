import Vue from "vue";
import App from "./App";
import { inBrowser } from "./util/dom";
import { createRouter } from "./router";

console.log("inBrowser=>", inBrowser);
// 浏览器环境专用组件
if (inBrowser) {
  console.log("Register components inBrowser");
  // import Storage from "vue-web-storage";
  const Storage = import("vue-web-storage");
  Storage.then(resolve => {
    console.log("vue-web-storage register success");
    // console.log(resolve.default);
    // This will register two instances
    // Vue.$sessionStorage
    // Vue.$localStorage
    // Use as
    // Vue.$localStorage
    Vue.use(resolve.default, {
      prefix: "jvue_", // default `app_`
      drivers: ["session", "local"] // default 'local'
    });
    console.log("Vue.$sessionStorage=>", Vue.$sessionStorage);
  }).catch(rejected => {
    console.log("vue-web-storage load error:" + rejected);
  });
}

// 引入通用组件

/**
 * Expose a factory function that creates a fresh set of router,
 * app instances on each call (which is called for each SSR request)
 * @param ssrContext
 * @returns {{app: Vue | CombinedVueInstance<V, object, object, object, Record<never, any>>, router: VueRouter}}
 */
export function createApp(ssrContext) {
  console.log("enter app.js=> the main entry");

  // create router instances
  const router = createRouter();

  // create the app instance.
  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router`.
  const app = new Vue({
    router,
    ssrContext,
    render: h => h(App)
  });

  // expose the app, the router
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router };
}
