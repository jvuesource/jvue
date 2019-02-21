<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <h1>This is home</h1>
    <h1>Hello World! Vue,j2v8! Auther by Terwer</h1>
    <p>{{ message }}</p>
    <p>
      <button @click="showMessage">显示当前时间</button>
    </p>
    <p v-html="posts.length > 0 ? posts[0] : '<h1>No data</h1>'"></p>
  </div>
</template>

<script>
/* eslint-disable */
import postApi from "../api/post";
import config from "../../jvue.config";
import Vue from "vue";

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
    // 服务端获取Session
    console.log("config.isSsrServer=>", config.isSsrServer);
    if (config.isSsrServer) {
      const data = getSessionCallback("getPostList");
      this.posts = data;
      console.log("Home getSession from server");
    } else {
      // 客户端获取数据
      // console.log("client getSession window.__INITIAL_STATE__=>", window.__INITIAL_STATE__ )
      // console.log("client getSession Vue.$sessionStorage=>", Vue.$sessionStorage)
      if (typeof Vue.$sessionStorage != "undefined") {
        console.log("Vue.$sessionStorage", Vue.$sessionStorage);
        const data = Vue.$sessionStorage.get("getPostList");
        this.posts = data;
        console.log("Home getSession from Vue.$sessionStorage");
      }
    }
  },
  asyncData() {
    // 触发action后，会返回Promise
    console.log("Home page => PostList asyncData");
    return new Promise((resolve, reject) => {
      postApi
        .getPostList()
        .then(res => {
          console.log("Home page asyncData fetch success");
          const posts = res.data.data;
          // 服务端设置Session
          console.log("config.isSsrServer=>", config.isSsrServer);
          if (config.isSsrServer) {
            console.log("getPostList setSession to server");
            setSessionCallback("getPostList", JSON.stringify(posts));
          } else {
            // 客户端存储数据
            // console.log("client setSession window.__INITIAL_STATE__=>", window.__INITIAL_STATE__ )
            // console.log("client setSession Vue.$sessionStorage=>", Vue.$sessionStorage)
            console.log("getPostList setSession to $sessionStorage");
            Vue.$sessionStorage.set("getPostList", JSON.stringify(posts));
          }
          resolve(res.data);
        })
        .catch(reason => {
          console.error("getPostList request error,reason=>", reason);
          reject("Error");
        });
    });
  },
  methods: {
    showMessage() {
      this.message = new Date();
    }
  }
};
</script>
