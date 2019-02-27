/**
 * 仅运行于浏览器
 *
 *@author Terwer
 *@version 1.0
 *2019/2/27 10:00
 **/
import { createApp } from "./app";

// 客户端特定引导逻辑……
const { app } = createApp();

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount("#app");
