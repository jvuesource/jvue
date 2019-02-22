<template>
  <b-container fluid>
    <HeaderTime />
    <Header />
    <h1>This is about</h1>
    <Footer/>
    <FriendLink/>
  </b-container>
</template>

<script>
import HeaderTime from "../components/themes/default/HeaderTime";
import Header from "../components/themes/default/Header";
import Footer from "../components/themes/default/Footer";
import FriendLink from "../components/themes/default/FriendLink";

export default {
  name: "Home",
  components: {
    HeaderTime,
    Header,
    Footer,
    FriendLink
  }
};
</script>
