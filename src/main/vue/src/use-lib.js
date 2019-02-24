import { getLogger } from "./util/logger";
const logger = getLogger("use-lib");
import config from "../jvue.config";

import Vue from "vue";

// 引入通用组件
// 组件引用
import BootstrapVue from "bootstrap-vue";
// 组建注册
Vue.use(BootstrapVue);

//记录日志，可以代替console.log
logger.debug("config=>" + JSON.stringify(config));

if (config.inBrowser) {
  const uweb = require("vue-uweb");
  Vue.use(uweb.default, {
    siteId: "4445524",
    // http://s11.cnzz.com/z_stat.php?id=SITEID&web_id=SITEID // 文字样式
    src: "http://s5.cnzz.com/stat.php?id=4445524&show=pic" // 图片样式
  });
  logger.info("Register uweb success");
}

/**
 * 动态引用依赖库
 * @returns {Promise<any>}
 */
export const useLib = () => {
  // 引入特定组件
  return new Promise((resolve, reject) => {
    // 浏览器环境专用组件
    if (config.inBrowser) {
      // import Storage from 'vue-web-storage'
      const StoragePromise = import(/* webpackChunkName: "vue-web-storage" */ "vue-web-storage");

      Promise.all([StoragePromise])
        .then(function(values) {
          logger.info("Register components inBrowser");
          // Storage
          const Storage = values[0];
          Vue.use(Storage.default, {
            prefix: "jvue_", // default `app_`
            drivers: ["session", "local"] // default 'local'
          });
          logger.info("vue-web-storage register success");

          // the end return success
          return resolve("浏览器环境动态注册组件成功");
        })
        .catch(rejected => {
          logger.error(`Register components rejected=>${rejected}`);
          return reject(rejected);
        });
    } else {
      // the end return success
      return resolve("服务端环境，无动态组件");
    }
  });
};
