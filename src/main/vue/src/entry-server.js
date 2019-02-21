import { createApp } from "./app";

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            console.log("调用asyncData获取数据");
            return Component.asyncData({
              route: router.currentRoute
            });
          }
        })
      )
        .then(res => {
          console.log("matchedComponents asyncData res=>", res);
          resolve(app);
        })
        .catch(rejected => {
          console.log("asyncData rejected=>", rejected);
        });
    });
  });
};
