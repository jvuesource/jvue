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
    const StoragePromise = import(/* webpackChunkName: "vue-web-storage" */ "vue-web-storage");
    var promise1 = Promise.resolve(3);
    var promise2 = 42;
    var promise3 = new Promise(function(resolve, reject) {
      setTimeout(resolve, 100, "foo");
    });
    Promise.all([StoragePromise, promise1, promise2, promise3])
      .then(function(values) {
        console.log(values);
        // 浏览器环境专用组件
        if (inBrowser) {
          console.log("Register components inBrowser");
          // Storage
          const Storage = values[0];
          console.log("vue-web-storage register success", Storage);
          Vue.use(Storage.default, {
            prefix: "jvue_", // default `app_`
            drivers: ["session", "local"] // default 'local'
          });
          console.log("Vue.$sessionStorage=>", Vue.$sessionStorage);
        }

        // the end return success
        return resolve("Register components OK");
      })
      .catch(rejected => {
        console.error("Register components rejected=>", rejected);
      });
  });
