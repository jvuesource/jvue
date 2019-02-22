const webpack = require("webpack");
const merge = require("webpack-merge");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = require("../jvue.config");

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || "/";

const inject = !config.isSsr;
console.log("config.isSsr=>", config.isSsr);
console.log("inject=>", inject);

let webpackCnfig = {
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
          isSsr: config.isSsr,
          base: ASSET_PATH
        },
        config.seo
      )
    )
  ]
};

// 重新修改webpack配置
if (config.isClient) {
  // 热加载
  console.log("热加载");
  webpackCnfig = merge(webpackCnfig, {
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
} else {
  // CSS剥离
  console.log("CSS剥离");
  webpackCnfig = merge(webpackCnfig, {
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[hash:6].css"
      })
    ]
  });
}

if (config.isProduction) {
  // 压缩css
  console.log("压缩css");
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
