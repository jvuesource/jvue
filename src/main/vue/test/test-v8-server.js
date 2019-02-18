//  babel test/test-v8-server.js --presets=@babel/preset-env
// ==================
// test Server
// ==================

const v8Server = require("../server/v8-server");

const nuxt = v8Server.init();
console.log("nuxt=>", nuxt);

// const res = await nuxt.renderRoute("/");
// console.log(res);
