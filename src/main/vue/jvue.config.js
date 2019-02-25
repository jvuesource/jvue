const log = require("./src/util/logger");
const logger = log.getLogger("jvue.config");
const inBrowser = require("./src/util/dom").inBrowser;

var env = require("env-variable")({
  NODE_ENV: process.env.NODE_ENV,
  TEST_ENV: "test"
});
logger.info("env=>" + JSON.stringify(env));

// node环境`production`或者`development`
const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === "production";
// c: 客户端渲染
// ssrc: 服务段渲染的客户端执行部分
// ssrs: 服务端渲染的服务段执行部分
const ssrEnv = process.env.SSR_ENV;
const isClient = ssrEnv === "c";
const isSsrClient = process.env.SSR_ENV === "ssrc";
const isSsrServer = process.env.SSR_ENV === "ssrs";
const isSsr = process.env.SSR_ENV === "ssrc" || process.env.SSR_ENV === "ssrs";

module.exports = {
  inBrowser,
  nodeEnv,
  isProduction,
  ssrEnv,
  isClient,
  isSsrClient,
  isSsrServer,
  isSsr
};
