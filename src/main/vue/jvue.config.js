// the environment that will be considered when building the skin,
// either `production` or `development`
const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";
// c: 客户端渲染
// ssrc: 服务段渲染的客户端执行部分
// ssrs: 服务端渲染的服务段执行部分
const ssrEnv = process.env.SSR_ENV;
const isClient = process.env.SSR_ENV === "c";
const isSsrClient = process.env.SSR_ENV === "ssrc";
const isSsrServer = process.env.SSR_ENV === "ssrs";
const isSsr = process.env.SSR_ENV === "ssrc" || process.env.SSR_ENV === "ssrs";
const pkg = require("./package.json");

// This is page seo
const seo = {
  title: [pkg.name, " v", pkg.version].join(""),
  meta: {
    keywords: pkg.keywords.join(),
    description: pkg.description
  }
};

const conf = {
  nodeEnv,
  isProduction,
  ssrEnv,
  isClient,
  isSsrClient,
  isSsrServer,
  isSsr,
  seo
};
console.log("conf.ssrEnv=>", conf.ssrEnv);

module.exports = conf;
