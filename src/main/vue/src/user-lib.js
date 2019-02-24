import { inBrowser } from "./util/dom";
import Vue from "vue";

// 引入通用组件
// 组件引用
import BootstrapVue from "bootstrap-vue";
// 组建注册
Vue.use(BootstrapVue);

// 引入特定组件
console.log("inBrowser=>", inBrowser);

/**
 * 动态引用依赖库
 * @returns {Promise<any>}
 */
export const useLib = () =>
  new Promise((resolve, reject) => {
    // 浏览器环境专用组件
    if (inBrowser) {
      // import Storage from 'vue-web-storage'
      const StoragePromise = import(/* webpackChunkName: "vue-web-storage" */ "vue-web-storage");
      // import uweb from 'vue-uweb'
      const UWebPromise = import(/* webpackChunkName: "vue-uweb" */ "vue-uweb");

      Promise.all([StoragePromise, UWebPromise])
        .then(function(values) {
          console.log(values);

          console.log("Register components inBrowser");
          // Storage
          const Storage = values[0];
          console.log("vue-web-storage register success", Storage);
          Vue.use(Storage.default, {
            prefix: "jvue_", // default `app_`
            drivers: ["session", "local"] // default 'local'
          });
          console.log("Vue.$sessionStorage=>", Vue.$sessionStorage);

          // uweb
          const uweb = values[1];
          Vue.use(uweb.default, {
            siteId: "4445524",
            // http://s11.cnzz.com/z_stat.php?id=SITEID&web_id=SITEID // 文字样式
            src: "http://s5.cnzz.com/stat.php?id=4445524&show=pic" // 图片样式
          });
          console.log("uweb register success");

          // the end return success
          return resolve("浏览器环境动态注册组件成功");
        })
        .catch(rejected => {
          console.error("Register components rejected=>", rejected);
          return reject(rejected);
        });
    } else {
      // the end return success
      return resolve("服务端环境，无动态组件");
    }
  });
