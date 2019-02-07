// =============================
// This is polyfill not in node
// =============================

// =============================
// Require compiled script
// =============================
require("../../ssrdist/js/server-bundle.js");

// =============================
// Test script start
// =============================
const context = {
  url: "/"
  // url: "/p/1.html"
  // url: "/test-no-page"
};

const promise = global.renderServer(context);
// console.log(promise);
promise.then(
  resolve => {
    console.log("resolve");
    console.log(resolve);
  },
  rejected => {
    console.log("rejected");
    console.log(rejected);
  }
);
