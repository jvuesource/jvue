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
    <p
      v-html="posts.length > 0 ? posts[0].postContent : '<h1>No data</h1>'"
    ></p>
  </div>
</template>

<script>
import postApi from "../api/post";
import config from "../../jvue.config";
import { setSessionStorage, getSessionStorageOrDefault } from "../util/storage";
import { isEmptyOrUndefined } from "../util/string";
// import { inBrowser } from "../util/dom";

export default {
  name: "About",
  data() {
    return {
      message: "jvue",
      posts: []
    };
  },
  watch: {
    posts(newval, oldval) {
      console.log("watch posts=>newval:", newval);
      console.log("watch posts=>oldval:", oldval);
    }
  },
  created() {
    console.log("Home created");
    console.log("process.env.SSR_ENV=>", process.env.SSR_ENV);
    console.log("config.ssrEnv=>", config.ssrEnv);
    console.log("config.isSsrServer=>", config.isSsrServer);
    // 服务端获取Session
    if (config.isSsrServer) {
      const data = global.getSessionCallback("getPostList");
      console.log("Home getSession from server");
      console.log("server getSessionCallback=>", data);
      this.posts = data;
      console.log("this.posts", this.posts);
    } else {
      // 客户端获取数据
      console.log("window.__INITIAL_STATE__=>", window.__INITIAL_STATE__);
      console.log("Home getSession from client");
      let dataObj = [];
      // 优先获取SessionStorage，因为这里是最新更新的数据，点击客户端路由就会更新
      const data = getSessionStorageOrDefault("getPostList", "[]");
      dataObj = eval(data);
      // 没有Session取window.__INITIAL_STATE__，这里只有出发服务端渲染才会更新
      if (
        dataObj.length === 0 &&
        !isEmptyOrUndefined(window.__INITIAL_STATE__)
      ) {
        console.log("get data from window.__INITIAL_STATE__ in ssrClient");
        const initData = window.__INITIAL_STATE__[0];
        dataObj = initData.data;
      }
      console.log("client getSessionStorage=>", dataObj);
      this.posts = dataObj;
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
            global.setSessionCallback("getPostList", JSON.stringify(posts));
          } else {
            // 客户端存储数据
            console.log("getPostList setSession to $sessionStorage");
            setSessionStorage("getPostList", JSON.stringify(posts));
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
