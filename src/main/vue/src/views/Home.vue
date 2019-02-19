<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <h1>This is home</h1>
    <h1>Hello World! Vue,j2v8! Auther by Terwer</h1>
    <p>{{ message }}</p>
    <p><button @click="showMessage">显示当前时间</button></p>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      message: "jvue"
    };
  },
  methods: {
    showMessage() {
      this.message = new Date();
    }
  }
};
</script>
