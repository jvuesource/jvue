import Vue from "vue";
import App from "./App";
import { createRouter } from "./router";
import { useLib } from "./user-lib";

/**
 * Expose a factory function that creates a fresh set of router,
 * app instances on each call (which is called for each SSR request)
 * @param ssrContext
 * @returns {{app: Vue | CombinedVueInstance<V, object, object, object, Record<never, any>>, router: VueRouter}}
 */
export const createApp = ssrContext =>
  new Promise((resolve, reject) => {
    console.log("enter app.js=> the main entry");

    useLib().then(msg => {
      console.log(msg);

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
      return resolve({ app, router });
    });
  });
