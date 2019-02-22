const base = require("./webpack.base.config");
const merge = require("webpack-merge");

const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

console.log("SsrClient build=>base.config:", base.config);

const clientConfig = merge(base.webpackConfig, {
  entry: "./src/entry-client.js",
  output: {
    filename: "js/[name].[hash:6].js"
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        exclude: [/node_modules/],
        use: [
          base.config.isClient ? "vue-style-loader" : ExtractCssChunks.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
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
        inject: base.config.isClient,
        isSsr: base.config.isSsr,
        base: base.webpackConfig.output.publicPath
      })
    ),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[hash].css",
      // chunkFilename: "[id].css",
      hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
      orderWarning: true, // Disable to remove warnings about conflicting order between imports
      reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      cssModules: true // if you use cssModules, this can help.
    })
  ]
});

module.exports = clientConfig;
