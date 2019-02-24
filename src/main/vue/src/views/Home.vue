<template>
  <b-container fluid>
    <HeaderTime />
    <Header />
    <Body />
    <h1 class="text-center">This is home</h1>
    <div v-for="post in posts" :key="post.postId">
      <h1>{{ post.postTitle }}</h1>
      <p v-html="post.postContent"></p>
    </div>
    <Footer />
    <FriendLink />
  </b-container>
</template>

<script>
import postApi from "../api/post";
import config from "../../jvue.config";
import { setSessionStorage, getSessionStorageOrDefault } from "../util/storage";
import { isEmptyOrUndefined } from "../util/string";
// import { inBrowser } from "../util/dom";
import HeaderTime from "../components/themes/default/HeaderTime";
import Header from "../components/themes/default/Header";
import Body from "../components/themes/default/Body";
import Footer from "../components/themes/default/Footer";
import FriendLink from "../components/themes/default/FriendLink";

export default {
  name: "About",
  components: {
    HeaderTime,
    Header,
    Body,
    Footer,
    FriendLink
  },
  // 钩子函数
  mounted() {
    const that = this;
    setTimeout(function() {
      console.log("加载站点配置");
      that.siteConfig = {};
    }, 2000);
  },
  data() {
    return {
      message: "jvue",
      siteConfig: null,
      // posts: []
      //=========================================================================
      // serve 测试专用
      posts: [
        { postId: 1, postTitle: "title", postContent: "express test post" },
        { postId: 2, postTitle: "sdfdffsdfdrs", postContent: "fdsfdsff" }
      ]
      //==========================================================================
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
      let dataObj = [];
      dataObj = eval(data);
      this.posts = dataObj;
      console.log("this.posts", this.posts);
    } else {
      // 客户端获取数据
      //============================
      // serve 测试专用
      if (this.posts.length > 0) {
        return;
      }
      //=============================
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

<style scoped>
@import "../components/themes/default/style.css";
</style>
