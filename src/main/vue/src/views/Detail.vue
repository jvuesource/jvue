<template>
  <b-container fluid>
    <HeaderTime />
    <Header />
    <b-row>
      <b-col sm="0" md="0" lg="0" xl="2"></b-col>
      <b-col>
        <b-breadcrumb :items="items" />
        <div id="postContent">
          <h1 class="text-center">This is detail {{ postId }}</h1>
        </div>
      </b-col>
      <b-col sm="0" md="0" lg="0" xl="2"></b-col>
    </b-row>
    <Footer :site-config="siteConfigObj" />
    <FriendLink />
  </b-container>
</template>

<script>
import { getLogger } from "../util/logger";
const logger = getLogger("detail");
import { setSession, getSession } from "../util/storage";
const CircularJSON = require("circular-json");
import HeaderTime from "../components/themes/default/HeaderTime";
import Header from "../components/themes/default/Header";
import Footer from "../components/themes/default/Footer";
import FriendLink from "../components/themes/default/FriendLink";
import siteConfigApi from "../api/site-config";

export default {
  name: "Detail",
  computed: {
    postId() {
      return this.$route.params.id;
    }
  },
  watch: {
    $route(to, from) {
      // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
      console.log(to);
      console.log(from);
    }
  },
  components: {
    HeaderTime,
    Header,
    Footer,
    FriendLink
  },
  data() {
    return {
      items: [
        {
          text: "首页",
          href: "/"
        },
        {
          text: "文章",
          active: true
        }
      ],
      siteConfigObj: {}
    };
  },
  created: function() {
    logger.info("Home created,set asyncData");
    const siteConfigData = getSession("siteConfig", "{}");
    this.siteConfigObj = CircularJSON.parse(siteConfigData);
    logger.debug("siteConfigData=>");
    logger.debug(this.siteConfigObj);
  },
  asyncData() {
    // 触发action后，会返回Promise
    logger.info("About page=> asyncData");
    return new Promise((resolve, reject) => {
      const getSiteConfigPromise = siteConfigApi.getSiteConfig();
      Promise.all([getSiteConfigPromise])
        .then(function(values) {
          logger.debug(CircularJSON.stringify(values));
          let asyncDataMap = {};
          const siteConfig = values[0].data;
          if (siteConfig.status === 1) {
            const siteConfigString = CircularJSON.stringify(siteConfig.data);
            asyncDataMap["siteConfig"] = siteConfigString;
            setSession("siteConfig", siteConfigString);
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
.breadcrumb {
  margin-top: 10px;
}
#postContent {
}
</style>
