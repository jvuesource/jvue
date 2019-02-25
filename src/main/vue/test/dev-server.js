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
const resolvePath = file => path.resolve(__dirname, file);

const express = require("express");
const expressThymeleaf = require("express-thymeleaf");
const { TemplateEngine, StandardDialect } = require("thymeleaf");

// Configure your application to use Thymeleaf via the express-thymeleaf module
let app = express();
let templateEngine = new TemplateEngine({
  dialects: [new StandardDialect("th")]
});
app.engine("html", expressThymeleaf(templateEngine));
app.set("view engine", "html");

const port = 3000;

// 静态资源
const favicon = require("serve-favicon");
const serve = path => express.static(resolvePath(path));

const render = require("../dist/server");

app.use(favicon("./public/favicon.ico"));
app.use("/js", serve("../dist/js", false));
app.use("/css", serve("../dist/css", false));

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

  const promise = render.renderServerProimise(context);
  promise
    .then((html, err) => {
      if (err) {
        console.log("err=>", err);
        res.send(err);
        return;
      }
      // console.log("html=>", html);

      // Render template from file
      console.log("context=>", context);
      const httpContext = JSON.parse(context);
      console.log("httpContext=>");
      console.log(httpContext);
      templateEngine
        .processFile(resolvePath("../dist/index.html"), {
          httpContext: httpContext,
          content: html
        })
        .then(renderedContent => {
          // Do something with the result...
          // console.log("render index.html with thymeleafJS", renderedContent);
          res.send(renderedContent);
        })
        .catch(reject => {
          res.send(`<h1>${reject}</h1>`);
        });

      // lookup view file in /views
      // res.render('index');
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
  const value = JSON.stringify(require("./test-data").data);
  console.log("getSessionCallback key=>", key);
  console.log("getSessionCallback value=>", value);
  return value;
};
