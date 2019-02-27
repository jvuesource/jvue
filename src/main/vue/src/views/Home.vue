<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import { getLogger } from "../util/logger";
const logger = getLogger("views/home");
/**
 * 在 Vue 2.5 以下的版本中，服务端渲染时异步组件只能用在路由组件上。
 * 然而在 2.5+ 的版本中，得益于核心算法的升级，异步组件现在可以在应用中的任何地方使用。
 * https://ssr.vuejs.org/zh/guide/routing.html#代码分割
 */
import HelloWorld from "../components/HelloWorld";
import postApi from "../api/post";
/**
 * 由于没有动态更新，所有的生命周期钩子函数中，
 * 只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用。
 */
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created: function() {
    postApi
      .getPostList()
      .then((resolve, reject) => {
        logger.debug(resolve);
      })
      .catch(rejected => {
        logger.error(rejected);
      });
    logger.info("Home created,set asyncData");
  }
};
</script>
