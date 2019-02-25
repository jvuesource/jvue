const log = require("../src/util/logger");
const logger = log.getLogger("webpack.client.config");
const base = require("./webpack.base.config");
const merge = require("webpack-merge");
const webpack = require("webpack");

const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let clientConfig = merge(base.webpackConfig, {
  entry: "./src/entry-client.js",
  output: {
    filename: "js/[name].[hash:6].js"
  },
  // 客户端环境去掉nodejs相关配置
  node: {
    console: true,
    fs: "empty",
    module: "empty"
  },
  // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
  // 以便可以在之后正确注入异步 chunk。
  // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    // 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。
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

// 重新修改webpack配置
if (base.config.isClient) {
  logger.info("配置开发环境热加载服务器");
  clientConfig = merge(clientConfig, {
    devServer: {
      stats: "errors-only",
      host: "0.0.0.0",
      port: 8888,
      hot: true,
      open: false,
      disableHostCheck: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
}

if (base.config.isProduction) {
  // 压缩css
  logger.info("压缩css");
  const cssAssetsPlugin = new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require("cssnano"),
    cssProcessorPluginOptions: {
      preset: [
        "default",
        {
          discardComments: {
            removeAll: false
          }
        }
      ]
    },
    canPrint: true
  });
  clientConfig = merge(clientConfig, {
    plugins: [cssAssetsPlugin]
  });
}

module.exports = clientConfig;
