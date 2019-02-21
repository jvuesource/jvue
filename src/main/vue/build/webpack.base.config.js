const webpack = require("webpack");
const merge = require("webpack-merge");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = require("../jvue.config");

const inject = !config.isSsr;
console.log("config.isSsr=>", config.isSsr);
console.log("inject=>", inject);

let webpackCnfig = {
  mode: process.env.NODE_ENV,
  resolve: {
    // import vue without .vue
    extensions: ["*", ".js", ".vue", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        exclude: [/node_modules/],
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"]
          }
        }
      },
      {
        test: /\.vue$/,
        exclude: [/node_modules/],
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          config.isClient ? "vue-style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          config.isClient ? "vue-style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // html模板注入
    new HtmlWebpackPlugin(
      Object.assign(
        {
          template: "./public/index.ejs",
          favicon: "./public/favicon.ico",
          // inject为true会自动在html文件中添加js和css引用,
          // 并且只对于Client和SsrClient生效，对SsrServer构建无效
          inject: inject,
          isSsr: config.isSsr
        },
        config.seo
      )
    ),
    // CSS剥离
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:6].css"
    })
  ]
};

// 重新修改webpack配置
if (config.isClient) {
  // 热加载
  console.log("Hot reload is open");
  webpackCnfig = merge(webpackCnfig, {
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
}

if (config.isProduction) {
  // 压缩css
  console.log("OptimizeCSSAssets is open");
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
  webpackCnfig = merge(webpackCnfig, {
    plugins: [cssAssetsPlugin]
  });
}

// export config
const conf = {
  config: config,
  webpackCnfig: webpackCnfig
};

module.exports = conf;
