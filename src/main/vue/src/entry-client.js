import { createApp } from "./app";
import config from "../config";

const { app, router } = createApp();

if (config.isProduction) {
  // wait until router has resolved all async before hooks
  // and async components...
  router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);
      let diffed = false;

      const activated = matched.filter((component, i) => {
        return diffed || (diffed = prevMatched[i] !== component);
      });
      if (!activated.length) {
        return next();
      }
    });

    // actually mount to DOM
    app.$mount("#app");
  });
} else {
  // actually mount to DOM
  app.$mount("#app");
}
