<template>
  <div id="jvue-root">
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
#jvue-root {
  font-family: "Microsoft YaHei", sans-serif;
}
</style>
