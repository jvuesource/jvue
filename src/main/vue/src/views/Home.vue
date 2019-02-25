<template>
  <b-container fluid>
    <HeaderTime />
    <Header />
    <Body :post-list="postListArray" />
    <Footer :site-config="siteConfigObj" />
    <FriendLink />
  </b-container>
</template>

<script>
import { getLogger } from "../util/logger";
const logger = getLogger("about");
const { parse, stringify } = require("flatted/cjs");
import { setSession, getSession } from "../util/storage";
import HeaderTime from "../components/themes/default/HeaderTime";
import Header from "../components/themes/default/Header";
import Body from "../components/themes/default/Body";
import Footer from "../components/themes/default/Footer";
import FriendLink from "../components/themes/default/FriendLink";
import siteConfigApi from "../api/site-config";
import postApi from "../api/post";

export default {
  name: "About",
  components: {
    HeaderTime,
    Header,
    Body,
    Footer,
    FriendLink
  },
  data() {
    return {
      siteConfigObj: {},
      postListArray: []
    };
  },
  created: function() {
    logger.info("Home created,set asyncData");

    const siteConfigData = getSession("siteConfig", "{}");
    // logger.info("siteConfigData=>" + siteConfigData);
    this.siteConfigObj = parse(siteConfigData);

    const postListData = getSession("postList", "[]");
    // logger.info("postListData=>" + postListData);
    this.postListArray = parse(postListData);
  },
  asyncData() {
    // 触发action后，会返回Promise
    logger.info("Home page=> asyncData");
    return new Promise((resolve, reject) => {
      const getSiteConfigPromise = siteConfigApi.getSiteConfig();
      const getPostListPromise = postApi.getPostList();
      Promise.all([getSiteConfigPromise, getPostListPromise])
        .then(function(values) {
          logger.debug(stringify(values));
          let asyncDataMap = {};
          const siteConfig = values[0].data;
          const postList = values[1].data;
          if (siteConfig.status === 1) {
            const siteConfigString = stringify(siteConfig.data);
            asyncDataMap["siteConfig"] = siteConfigString;
            setSession("siteConfig", siteConfigString);
          }
          if (postList.code === 0) {
            const postListString = stringify(postList.data);
            asyncDataMap["postList"] = postListString;
            setSession("postList", postListString);
          }
          resolve(asyncDataMap);
        })
        .catch(reason => {
          logger.error("asyncData request error,reason=>" + reason);
          reject(reason);
        });
    });
  }
};
</script>

<style scoped>
@import "../components/themes/default/style.css";
</style>
