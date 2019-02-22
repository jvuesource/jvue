<template>
  <b-container fluid>
    <HeaderTime />
    <Header />
    <h1 class="text-center">This is category {{ catId }}</h1>
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
  name: "Category",
  components: {
    HeaderTime,
    Header,
    Footer,
    FriendLink
  },
  computed: {
    catId() {
      return this.$route.params.id;
    }
  }
};
</script>

<style scoped></style>
