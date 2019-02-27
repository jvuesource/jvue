/**
 * vue.config.js
 *
 * @author Terwer
 * @version 1.0
 * 19-2-26 下午10:40
 **/
const pkg = require("./package.json");
module.exports = {
  /**
   * 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，
   * 但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 publicPath
   * 而不要直接修改 webpack 的 output.publicPath。
   */
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  /**
   * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
   * https://cli.vuejs.org/zh/config/#lintonsave
   */
  lintOnSave: true,
  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  // https://cli.vuejs.org/zh/config/#chainwebpack
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      // inject为true会自动在html文件中添加js和css引用
      args[0].inject = true;
      args[0].template = "./public/index.html";
      args[0].favicon = "./public/favicon.ico";
      args[0].title = pkg.name.concat(" v").concat(pkg.version);
      args[0].debug = process.env.VUE_APP_DEBUG;
      return args;
    });
  }
};
