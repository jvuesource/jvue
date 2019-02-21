const { VueLoaderPlugin } = require("vue-loader");

const config = require("../jvue.config");

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
  plugins: [new VueLoaderPlugin()]
};

// export config
const conf = {
  config: config,
  webpackCnfig: webpackCnfig
};

module.exports = conf;
