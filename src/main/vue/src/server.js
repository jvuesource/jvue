//  babel dist/server.js --presets=@babel/preset-env
// const fs = require("fs");
const path = require("path");

const resolve = file => {
  const fullpath = path.resolve(__dirname, file);
  console.log("fullpath=>", fullpath);
  return fullpath;
};

let renderer;

// get server html template
// path related to dist forder
// const template = fs.readFileSync(resolve("./index.html"), "utf-8");
// console.log(template);

const createRenderer = (bundle, options) => {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return require("vue-server-renderer").createBundleRenderer(
    bundle,
    Object.assign(options, {
      // 不是有服务端生成html，自己处理
      // template,
      cache: require("lru-cache")({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      // this is only needed when vue-server-renderer is npm-linked
      // path related to dist forder
      basedir: resolve("./"),
      // recommended for performance
      runInNewContext: false
    })
  );
};

// In production: create server renderer using built server bundle.
// The server bundle is generated by vue-ssr-webpack-plugin.
// path related to dist forder
const bundle = require("./vue-ssr-server-bundle.json");

// The client manifests are optional, but it allows the renderer
// to automatically infer preload/prefetch links and directly add <script>
// tags for any async chunks used during render, avoiding waterfall requests.
// path related to dist forder
const clientManifest = require("./vue-ssr-client-manifest.json");
renderer = createRenderer(bundle, {
  clientManifest
});

/**
 * 渲染服务
 * @param context 上下文
 * @param renderServerCallback 回调
 * @returns {*}
 */
function renderServer(context, renderServerCallback) {
  var promise = null;
  try {
    var contextObj = JSON.parse(context);
    promise = renderer.renderToString(contextObj);
    // 如果有callback，优先执行callback
    if (renderServerCallback) {
      console.log("callback exists,calling callback...");
      promise
        .then((resolve, reject) => {
          if (reject) {
            console.log("renderServer reject=>", reject);
            renderServerCallback(reject);
            return;
          }
          console.log("renderServer resolve success");
          renderServerCallback(null, resolve);
        })
        .catch(rejected => {
          console.log("renderServer catch=>", rejected);
          renderServerCallback(rejected);
        });
      return;
    }
  } catch (err) {
    console.log(err);
    if (renderServerCallback) {
      renderServerCallback(err);
    }
    throw new Error(err);
  }
  return promise;
}

module.exports = {
  renderServer
};
