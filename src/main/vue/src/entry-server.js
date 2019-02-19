import { createApp } from "./app";

// This exported function will be called by `bundleRenderer`.
// return a Promise that resolves to the app instance.
export default (context) => {
  return new Promise((resolve, reject) => {
    console.log("entry server received context=>", context);
    const { app, router } = createApp(context);

    router.push(context.url);

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，执行reject函数，并返回 404
      if (!matchedComponents.length) {
        return reject({
          status: 0,
          data: "No matchedComponents",
          msg: "404 Not Found"
        });
      }

      resolve(app);
    }, reject);
  });
};
