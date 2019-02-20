<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <h1>This is home</h1>
    <h1>Hello World! Vue,j2v8! Auther by Terwer</h1>
    <p>{{ message }}</p>
    <p><button @click="showMessage">显示当前时间</button></p>
    <p
      v-html="posts.length > 0 ? posts[0].postContent : '<h1>No data</h1>'"
    ></p>
  </div>
</template>

<script>
/* eslint-disable */
import postApi from "../api/post";

export default {
  name: "About",
  data() {
    return {
      message: "jvue",
      posts: []
    };
  },
  created() {
    console.log("Home created");
    this.posts = [{ aaa: "dgdff" }];
  },
  asyncData() {
    // 触发 action 后，会返回 Promise
    console.log("Home page => PostList asyncData");
    postApi
      .getPostList()
      .then(res => {
        console.log("Home page asyncData fetch success");
        const posts = res.data.data;
        if (setSessionCallback) {
          console.log("getPostList setSession");
          setSessionCallback("getPostList", JSON.stringify(posts));
        }
      })
      .catch(reason => {
        console.error("getPostList request error,reason=>", reason);
      });
  },
  methods: {
    showMessage() {
      this.message = new Date();
    }
  }
};
</script>
