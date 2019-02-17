const { Nuxt, Builder } = require("nuxt");

const config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

const nuxt = new Nuxt(config);

// ==================
// test Server
// ==================

const context = {};

if (config.dev) {
  console.log("build server");
  new Builder(nuxt).build().then(() => {
    renderServer(context);
  });
} else {
  renderServer(context);
}

function renderServer(context) {
  console.log("context=>", context);

  nuxt.renderRoute("/").then(({ html, error, redirected }) => {
    // `html` will be always a string
    console.log("html=>", html);

    // `error` not null when the error layout is displayed, the error format is:
    // { statusCode: 500, message: 'My error message' }
    console.log("error=>", error);

    // `redirected` is not `false` when `redirect()` has been used in `asyncData()` or `fetch()`
    // { path: '/other-path', query: {}, status: 302 }
    console.log("redirected=>", redirected);
  });
}
