/**
 * use-lib.js
 *
 * @author Terwer
 * @version 1.0
 * 19-2-28 上午12:36
 **/
import { getLogger } from "./util/logger";
const logger = getLogger("use-lib");
import { inBrowser } from "./util/dom";
import Vue from "vue";

// 引入通用组件
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
logger.debug("Register bootstrap-vue success");

/**
 * 动态引用依赖库
 * @returns {Promise<any>}
 */
export const useLib = () => {
  // 引入特定组件
  return new Promise((resolve, reject) => {
    // 浏览器环境专用组件
    if (inBrowser) {
      // 非动态注册
      const uweb = require("vue-uweb").default;
      Vue.use(uweb, {
        siteId: "4445524",
        // http://s11.cnzz.com/z_stat.php?id=SITEID&web_id=SITEID // 文字样式
        src: "http://s5.cnzz.com/stat.php?id=4445524&show=pic" // 图片样式
      });
      logger.debug("Register uweb success");

      // 动态注册
      // import Storage from 'vue-web-storage'
      const StoragePromise = import(/* webpackChunkName: "vue-web-storage" */ "vue-web-storage");

      Promise.all([StoragePromise])
        .then(function(values) {
          // Storage
          const Storage = values[0];
          Vue.use(Storage.default, {
            prefix: "jvue_", // default `app_`
            drivers: ["session", "local"] // default 'local'
          });
          logger.debug("Register vue-web-storage success");

          return resolve("浏览器环境组件注册成功");
        })
        .catch(rejected => {
          logger.error(`Register components rejected=>${rejected}`);
          return reject(rejected);
        });
    } else {
      return resolve("服务端环境组件注册完成");
    }
  });
};
