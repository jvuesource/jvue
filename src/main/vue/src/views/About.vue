<template>
  <b-container fluid>
    <HeaderTime />
    <Header />
    <h1 class="text-center">This is about</h1>
    <div>{{ siteConfigObj }}</div>
    <Footer />
    <FriendLink />
  </b-container>
</template>

<script>
import { getLogger } from "../util/logger";
const logger = getLogger("about");
import HeaderTime from "../components/themes/default/HeaderTime";
import Header from "../components/themes/default/Header";
import Footer from "../components/themes/default/Footer";
import FriendLink from "../components/themes/default/FriendLink";
import siteConfigApi from "../api/site-config";
const {parse, stringify} = require('flatted/cjs');
import { setSession, getSession } from "../util/storage";

export default {
  name: "Home",
  components: {
    HeaderTime,
    Header,
    Footer,
    FriendLink
  },
  data() {
    return {
      siteConfigObj: {}
    };
  },
  created: function() {
    logger.info("About created,set asyncData");
    const siteConfigData = getSession("siteConfig", "{}");
    logger.info("siteConfigData=>" + siteConfigData);
    this.siteConfigObj = parse(siteConfigData);
  },
  asyncData() {
    // 触发action后，会返回Promise
    logger.info("About page=> asyncData");
    return new Promise((resolve, reject) => {
      const getSiteConfigPromise = siteConfigApi.getSiteConfig();
      Promise.all([getSiteConfigPromise])
        .then(function(values) {
          logger.debug(stringify(values));
          let asyncDataMap = new Map();
          const siteConfig = values[0].data;
          if (siteConfig.status === 1) {
            asyncDataMap.set("siteConfig", siteConfig.data);
            setSession("siteConfig", stringify(siteConfig.data));
          }
          asyncDataMap.set("test", "test");
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
