<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

/**
 * 由于没有动态更新，所有的生命周期钩子函数中，
 * 只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用。
 */
export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
