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
const logger = getLogger("views/home");
/**
 * 在 Vue 2.5 以下的版本中，服务端渲染时异步组件只能用在路由组件上。
 * 然而在 2.5+ 的版本中，得益于核心算法的升级，异步组件现在可以在应用中的任何地方使用。
 * https://ssr.vuejs.org/zh/guide/routing.html#代码分割
 */
import HeaderTime from "../components/themes/default/HeaderTime";
import Header from "../components/themes/default/Header";
import Body from "../components/themes/default/Body";
import Footer from "../components/themes/default/Footer";
import FriendLink from "../components/themes/default/FriendLink";
import siteConfigApi from "../api/site-config";
import postApi from "../api/post";
import { setSession, getSession } from "../util/storage";
const CircularJSON = require("circular-json");

/**
 * 由于没有动态更新，所有的生命周期钩子函数中，
 * 只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用。
 */
export default {
  name: "home",
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
    this.siteConfigObj = CircularJSON.parse(siteConfigData);
    logger.debug("siteConfigData=>");
    logger.debug(this.siteConfigObj);

    const postListData = getSession("postList", "[]");
    this.postListArray = CircularJSON.parse(postListData);
    logger.debug("postListData=>");
    logger.debug(this.postListArray);
  },
  asyncData() {
    // 触发action后，会返回Promise
    logger.info("Home page=> asyncData");
    return new Promise((resolve, reject) => {
      const getSiteConfigPromise = siteConfigApi.getSiteConfig();
      const getPostListPromise = postApi.getPostList();
      Promise.all([getSiteConfigPromise, getPostListPromise])
        .then(function(values) {
          logger.debug(CircularJSON.stringify(values));
          let asyncDataMap = {};
          const siteConfig = values[0].data;
          const postList = values[1].data;
          if (siteConfig.status === 1) {
            const siteConfigString = CircularJSON.stringify(siteConfig.data);
            asyncDataMap["siteConfig"] = siteConfigString;
            setSession("siteConfig", siteConfigString);
          }
          if (postList.code === 0) {
            const postListString = CircularJSON.stringify(postList.data);
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
