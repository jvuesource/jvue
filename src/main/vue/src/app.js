import Vue from "vue";
import App from "./App";
import { createRouter } from "./router";

/**
 * Expose a factory function that creates a fresh set of
 * app instances on each call (which is called for each SSR request)
 * @param ssrContext
 * @returns {{app: Vue | CombinedVueInstance<V, object, object, object, Record<never, any>>}}
 */
export function createApp(ssrContext) {
  console.log("ssrContext=>", ssrContext);

  // create router instance
  const router = createRouter();

  // create the app instance.
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
