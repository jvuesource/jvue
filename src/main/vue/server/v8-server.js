const { Nuxt, Builder } = require("nuxt");

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // create builder
  const builder = new Builder(nuxt);
  builder.build().then(() => {
    // renderRoute
    nuxt.renderRoute("/").then(res => {
      console.log("res=>", res);
    });
  });
}
start();
