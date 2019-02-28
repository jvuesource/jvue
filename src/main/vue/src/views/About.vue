<template>
  <b-container fluid>
    <HeaderTime />
    <Header />
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </b-container>
</template>

<script>
import HeaderTime from "../components/themes/default/HeaderTime";
import Header from "../components/themes/default/Header";
export default {
  name: "home",
  components: {
    HeaderTime,
    Header
  }
};
</script>

<style lang="scss">
.about {
  color: #42b983;
  h1 {
    color: red;
  }
}
</style>
