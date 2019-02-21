// ====================================
// dev server with express
// ====================================

// 设置渲染模式
process.env.SSR_ENV = "ssrs";
process.env.VUE_ENV = "server";
process.env.NODE_ENV = "development";
process.on("unhandledRejection", function(reason, p) {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

const path = require("path");
const resolve = file => path.resolve(__dirname, file);

const express = require("express");
const app = express();
const port = 3000;

// 静态资源
const favicon = require("serve-favicon");
const serve = path => express.static(resolve(path));

const render = require("../dist/server");

app.use(favicon("./public/favicon.ico"));
app.use("/js", serve("../dist/js", false));

// handle http requests
app.get("*", (req, res) => {
  // get context
  const seo = {
    title: "title",
    meta: {
      keywords: "keywords",
      description: "description"
    }
  };
  const context = JSON.stringify(Object.assign({ url: req.url }, seo));

  render
    .renderServer(context)
    .then((resolve, reject) => {
      if (reject) {
        console.log("reject=>", reject);
        res.send(reject);
        return;
      }
      console.log("resolve");
      res.send(resolve);
    })
    .catch(rejected => {
      console.log("rejected=>", rejected);
      res.send(rejected);
    });
});

// start http server
app.listen(port, () => {
  console.log(`dev-server is listening on port ${port}!`);
});

// deal with callback
global.setSessionCallback = (key, value) => {
  console.log("key=>", key);
  console.log("value=>", value);
};

global.getSessionCallback = key => {
  const value = "[{'" + key + "'s value for test'}]";
  console.log("getSessionCallback key=>", key);
  console.log("getSessionCallback value=>", value);
  return value;
};
