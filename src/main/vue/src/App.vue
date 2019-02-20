<template>
  <div id="jvue">
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
