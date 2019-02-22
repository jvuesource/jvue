<template>
  <b-container fluid>
    <HeaderTime />
    <Header title="jvue" />
    <h1 class="text-center">This is register page</h1>
    <Footer />
    <FriendLink />
  </b-container>
</template>

<script>
import HeaderTime from "../components/themes/default/HeaderTime";
import Header from "../components/themes/default/Header";
import Footer from "../components/themes/default/Footer";
import FriendLink from "../components/themes/default/FriendLink";
export default {
  name: "Register",
  components: {
    HeaderTime,
    Header,
    Footer,
    FriendLink
  }
};
</script>

<style scoped></style>
