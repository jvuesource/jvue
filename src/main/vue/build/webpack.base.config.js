const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("../jvue.config");

const inject = !config.isSsr;
console.log("config.isSsr=>", config.isSsr);
console.log("inject=>", inject);

const webpackCnfig = {
  mode: process.env.NODE_ENV,
  resolve: {
    // import vue without .vue
    extensions: ["*", ".js", ".vue", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
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
    )
  ]
};

// export config
const conf = {
  config: config,
  webpackCnfig: webpackCnfig
};

module.exports = conf;
