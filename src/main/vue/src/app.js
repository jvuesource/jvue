/**
 * 通用 entry(universal entry)
 *
 *@author Terwer
 *@version 1.0
 *2019/2/27 10:17
 **/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = process.env.NODE_ENV === "development";

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  console.log("enter createApp");
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  });
  // 返回 app 和 router
  return { app, router };
}
