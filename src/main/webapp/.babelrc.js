module.exports = {
  presets: ["@babel/preset-env"],
    plugins: [
        "@babel/plugin-transform-runtime",
        [

            'component',
            {
                'libraryName': 'element-ui',
                'styleLibraryName': 'theme-chalk'
            }
        ]

  // plugins: [
  //     "transform-vue-jsx", "@babel/plugin-transform-runtime",
  //   [
  //     "component",
  //     {
  //       libraryName: "element-ui",
  //       styleLibraryName: "theme-chalk"
  //     }
  //   ]
  ]
};
