/**
 * vue.config.js
 *
 * @author Terwer
 * @version 1.0
 * 19-2-28 下午10:40
 **/
module.exports = {
  /**
   * 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，
   * 但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 publicPath
   * 而不要直接修改 webpack 的 output.publicPath。
   */
  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: config => {
    console.log("\nprocess.env.SSR_ENV=>", process.env.SSR_ENV);
    switch (process.env.SSR_ENV) {
      case "client": {
        // 客户端配置 (Client Config)
        // https://ssr.vuejs.org/zh/guide/build-config.html#客户端配置-client-config
        console.log("客户端配置");
        break;
      }
      case "server": {
        // 服务器配置 (Server Config)
        // https://ssr.vuejs.org/zh/guide/build-config.html#服务器配置-server-config
        console.log("服务器配置");
        break;
      }
      default: {
        // serve模式
        console.log("serve模式");

        // 两种配置都可以
        config.entry = "./src/entry-client.js";
        break;
      }
    }
  }
};
