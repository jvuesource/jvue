// babel test/v8-server.js --presets=@babel/preset-env
// ====================================
// test server
// ====================================

// 设置渲染模式
process.env.SSR_ENV = "ssrs";
process.env.VUE_ENV = "server";
process.env.NODE_ENV = "production";
process.on("unhandledRejection", function(reason, p) {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

const render = require("../dist/server");

// get context
const seo = {
  title: "title",
  meta: {
    keywords: "keywords",
    description: "description"
  }
};
const context = JSON.stringify(Object.assign({ url: "/" }, seo));

// deal with callback
global.renderServerCallback = (err, html) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("html=>", html);
};

global.setSessionCallback = (key, value) => {
  console.log("key=>", key);
  console.log("value=>", value);
};

global.getSessionCallback = key => {
  const value = JSON.stringify(require("./test-data").data);
  console.log("getSessionCallback key=>", key);
  console.log("getSessionCallback value=>", value);
  return value;
};

render.renderServer(context, global.renderServerCallback);
