import { createApp } from "./main";

createApp().then(resolve => {
  const app = resolve.app;
  const router = resolve.router;

  // wait until router has resolved all async before hooks
  // and async components...
  router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    router.beforeResolve((to, from, next) => {
      console.log("to=>", to.fullPath);
      console.log("from=>", from.fullPath);

      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);
      console.log("matched=>", matched);
      console.log("prevMatched=>", prevMatched);
      let diffed = false;

      // 查找当前活动的组件
      const activated = matched.filter((component, i) => {
        return diffed || (diffed = prevMatched[i] !== component);
      });
      if (!activated.length) {
        return next();
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(
        activated.map(Component => {
          if (Component.asyncData) {
            console.log("调用asyncData获取数据");
            return Component.asyncData({
              route: router.currentRoute
            });
          } else {
            console.log("未找到asyncData");
          }
        })
      )
        .then(res => {
          // 这里的结果会保存在SessionStorage
          console.log("matchedComponents asyncData res=>", res);
          next();
        })
        .catch(next);
    });
  });

  // actually mount to DOM
  app.$mount("#app");
});
