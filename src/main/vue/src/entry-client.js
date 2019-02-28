/**
 * 仅运行于浏览器
 *
 *@author Terwer
 *@version 1.0
 *2019/2/27 10:00
 **/
import { getLogger } from "./util/logger";
const logger = getLogger("entry-client");
import { createApp } from "./app";

// 客户端特定引导逻辑……
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
      logger.info("to=>", to.fullPath);
      logger.info("from=>", from.fullPath);

      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);
      logger.info("matched=>", matched);
      logger.info("prevMatched=>", prevMatched);
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
            logger.info("调用asyncData获取数据");
            return Component.asyncData({
              route: router.currentRoute
            });
          } else {
            logger.info("未找到asyncData");
          }
        })
      )
        .then(res => {
          // 这里的结果会保存在SessionStorage
          logger.debug("matchedComponents asyncData res=>", res);
          next();
        })
        .catch(next);
    });
  });

  // 这里假定 App.vue 模板中根元素具有 `id="app"`
  app.$mount("#app");
});
