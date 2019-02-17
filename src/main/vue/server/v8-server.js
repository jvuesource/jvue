const { Nuxt, Builder } = require("nuxt");

const config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

// ==================
// test Server
// ==================

async function init() {
  const nuxt = new Nuxt(config);

  console.log("building");

  await new Builder(nuxt).build();

  console.log("built");

  await nuxt.listen(4000, "localhost");

  console.log("listening...");

  const res = await nuxt.renderRoute("/");

  console.log(res);
}

init();
