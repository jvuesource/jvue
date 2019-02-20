<template>
  <div id="jvue">
    <router-view />
  </div>
</template>

<script>
import postApi from "./api/post";

export default {
  name: "App",
  mounted() {
    postApi
      .getPostList()
      .then(res => {
        console.log("getPostList=>", res.data.data);
      })
      .catch(reason => {
        console.error("getPostList request error,reason=>", reason);
      })
      .finally(() => {
        console.log("getPostList onFinally");
      });
    console.log("App mounted");
  }
};
</script>
