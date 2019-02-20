import Vue from "vue";
import Vuex from "vuex";
import post from "./modules/post";

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
      post
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  });
}
