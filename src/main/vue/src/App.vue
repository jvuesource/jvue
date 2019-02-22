<template>
  <div id="app">
    <header class="text-center">
      <!-- router-link 定义点击后导航到哪个路径下 -->
      <router-link to="/home">首页</router-link>
      <router-link to="/">简写首页</router-link><br />
      <router-link to="/post/1.html">ID文章</router-link>
      <router-link to="/post/my-post.html">别名文章</router-link>
      <router-link to="/p/small-post.html">简写文章</router-link><br />
      <router-link to="/category/category1">分类</router-link>
      <router-link to="/cat/cat2">简写分类</router-link>
      <router-link to="/c/c3">超短分类</router-link>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    console.log("App mounted");
  }
};
</script>
<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
#app {
  font-family: "Microsoft YaHei", sans-serif;
}
</style>
