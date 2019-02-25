const log = require("./src/util/logger");
const logger = log.getLogger("jvue.config");
const inBrowser = require("./src/util/dom").inBrowser;

// node环境production或者development
let nodeEnv = process.env.NODE_ENV;
nodeEnv = nodeEnv || "development";
const isProduction = nodeEnv === "production";

// ssr环境
// c: 客户端渲染
// ssrc: 服务段渲染的客户端执行部分
// ssrs: 服务端渲染的服务段执行部分
let ssrEnv = process.env.SSR_ENV;
if (inBrowser && !process.env.SSR_ENV) {
  ssrEnv = window.BROWSER_ENV.ssrEnv;
}
ssrEnv = ssrEnv || "c";
const isClient = ssrEnv === "c";
const isSsrClient = ssrEnv === "ssrc";
const isSsrServer = ssrEnv === "ssrs";
const isSsr = ssrEnv === "ssrc" || ssrEnv === "ssrs";

const config = {
  inBrowser,
  nodeEnv,
  isProduction,
  ssrEnv,
  isClient,
  isSsrClient,
  isSsrServer,
  isSsr
};

if (inBrowser) {
  logger.debug("window.BROWSER_ENV=>" + JSON.stringify(window.BROWSER_ENV));
}
logger.debug("config=>" + JSON.stringify(config));

module.exports = config;
