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
import { mapState, mapActions } from "vuex";

export default {
  name: "About",
  data() {
    return {
      message: "jvue"
    };
  },
  computed: mapState({
    posts: state => state.posts.all
  }),
  // created () {
  //   this.$store.dispatch('posts/getAllPosts')
  // },
  asyncData({ store }) {
    // 触发 action 后，会返回 Promise
    console.log("Home page => PostList asyncData");
    return store.dispatch("posts/getAllPosts");
  },
  methods: {
    ...mapActions([]),
    showMessage() {
      this.message = new Date();
    }
  }
};
</script>
