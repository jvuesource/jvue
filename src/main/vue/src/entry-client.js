import { createApp } from "./app";

const { app, router } = createApp();

router.onReady(() => {
  const matchedComponents = router.getMatchedComponents();
  // 匹配不到的路由，执行reject函数，并返回 404
  if (!matchedComponents.length) {
    console.error("404 Not Found");
    return;
  }
  console.info("matchedComponents=>", matchedComponents[0].name);

  router.beforeResolve((to, from, next) => {
    console.log("to=>", to.fullPath);
    console.log("from=>", from.fullPath);
    return next();
  });
});

// actually mount to DOM
app.$mount("#app");
