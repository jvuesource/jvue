<template>
  <div id="jvue">
    <router-view />
  </div>
</template>

<script>
import api from "./api";

export default {
  name: "App",
  mounted() {
    api.getPostList().then(item => {
      console.log("getPostList=>", item);
    });
    console.log("App mounted");
  }
};
</script>
