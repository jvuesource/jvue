import Vue from "vue";
import Vuex from "vuex";
import posts from "./modules/posts";

import createLogger from "../../src/plugins/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

/**
 * createStore
 * @returns {Vuex.store}
 */
export function createStore() {
  return new Vuex.Store({
    modules: {
      posts
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  });
}
