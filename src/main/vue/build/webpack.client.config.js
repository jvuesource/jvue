const base = require("./webpack.base.config");
const merge = require("webpack-merge");

const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log("SsrClient build=>base.config:", base.config);

const clientConfig = merge(base.webpackConfig, {
  entry: "./src/entry-client.js",
  output: {
    filename: "js/[name].[hash:6].js"
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    // html模板注入
    new HtmlWebpackPlugin(
      Object.assign({
        template: "./public/index.ejs",
        favicon: "./public/favicon.ico",
        // inject为true会自动在html文件中添加js和css引用,
        // 并且只对于Client和SsrClient生效，对SsrServer构建无效
        inject: true,
        isSsr: base.config.isSsr
      })
    )
  ]
});

module.exports = clientConfig;
