const base = require("./webpack.base.config");
const webpack = require("webpack");
const merge = require("webpack-merge");

const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

console.log("SsrServer build=>base.config:", base.config);

const serverConfig = merge(base.webpackConfig, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: "./src/entry-server.js",

  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: "node",

  // 对 bundle renderer 提供 source map 支持
  devtool: "source-map",

  output: {
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        exclude: [/node_modules/],
        use: [ExtractCssChunks.loader, "css-loader", "sass-loader"]
      }
    ]
  },

  // externals: Object.keys(require("../package.json").dependencies),
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    whitelist: /\.(css|scss)$/
  }),

  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin(),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[hash].css",
      // chunkFilename: "[id].css",
      hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
      orderWarning: true, // Disable to remove warnings about conflicting order between imports
      reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      cssModules: true // if you use cssModules, this can help.
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
});

module.exports = serverConfig;
