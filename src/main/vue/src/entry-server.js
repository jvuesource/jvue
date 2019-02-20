import { createApp } from "./app";

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise((resolve, reject) => {
    console.log("entry server received context=>", context);
    const { app, router, store } = createApp(context);

    router.push(context.url);

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，执行reject函数，并返回 404
      // 匹配不到的路由，执行reject函数，并返回 404
      if (!matchedComponents.length) {
        console.error("404 Not Found");
        return reject;
      }

      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(
        matchedComponents.map(Component => {
          console.log("Server matched Component");
          if (Component.asyncData) {
            console.log("Server 调用Component.asyncData获取数据");
            return Component.asyncData({
              store
            });
          } else {
            console.log("Server 未找到asyncData");
          }
        })
      )
        .then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          // context.state = store.state;
          // Promise应该resolve app
          console.log("Promise resolved success");
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
  //.catch(error => console.log("caught", error));
};
