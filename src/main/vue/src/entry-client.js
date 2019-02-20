// import "es6-promise/auto"
import { createApp } from "./app";

const { app, router, store } = createApp();

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  const matchedComponents = router.getMatchedComponents();
  // 匹配不到的路由，执行reject函数，并返回 404
  if (!matchedComponents.length) {
    console.error("404 Not Found");
    return;
  }
  console.info("matchedComponents=>", matchedComponents[0].name);

  // 对所有匹配的路由组件调用 `asyncData()`
  Promise.all(
    matchedComponents.map(Component => {
      console.log("Client matched Component");
      if (Component.asyncData) {
        console.log("调用Component.asyncData获取数据");
        return Component.asyncData({
          store
        });
      } else {
        console.log("未找到asyncData");
      }
    })
  )
    .then(() => {
      // 在所有预取钩子(preFetch hook) resolve 后，
      // 我们的 store 现在已经填充入渲染应用程序所需的状态。
      // 当我们将状态附加到上下文，
      // 并且 `template` 选项用于 renderer 时，
      // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
      window.__INITIAL_STATE__ = store.state;
      console.log("store.state=>", store.state);
      console.log("window.__INITIAL_STATE__=>", window.__INITIAL_STATE__);
    })
    .catch(() => {
      console.log("init asyncData invoke error");
    });

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

    // 调用asyncData获取数据
    Promise.all(
      activated.map(Component => {
        if (Component.asyncData) {
          console.log("调用asyncData获取数据");
          return Component.asyncData({ store, route: to });
        } else {
          console.log("未找到asyncData");
        }
      })
    )
      .then(() => {
        next();
      })
      .catch(next);
    // return next();
  });
});

// actually mount to DOM
app.$mount("#app");
