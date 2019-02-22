const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

const config = require("../jvue.config");

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || "/";

const webpackConfig = {
  mode: process.env.NODE_ENV,
  output: {
    // see https://webpack.docschina.org/guides/public-path/
    publicPath: ASSET_PATH
  },
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
    }),
    new VueLoaderPlugin()
  ]
};

// export config
const conf = {
  config,
  webpackConfig
};

module.exports = conf;
