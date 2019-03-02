<template>
  <div id="aside">
    <b-card>热门文章</b-card>
    <b-card
      tag="article"
      v-for="post in hotPosts"
      :key="post.postId"
      :title="post.postFullTitle === '' ? '无标题' : post.postFullTitle"
      sub-title="发布于5分钟前"
    >
      <b-media style="margin-bottom: 1rem;">
        <b-img
          v-if="post.thumbnails && post.thumbnails.length > 0"
          :src="post.thumbnails[0]"
          style="width: 100%;height:200px;"
        />
      </b-media>
      <p class="card-text">
        {{ post.postFullTitle === "" ? "无标题" : post.postFullTitle }}
      </p>
      <div class="article-ext">
        <a
          :href="
            post.postSlug === ''
              ? 'post/' + post.postId + '.html'
              : 'post/' + post.postSlug + '.html'
          "
          class="btn btn-primary"
          >立即查看</a
        >
        <span class="article-ext-info" :title="post.praiseCount"
          >点赞数：{{ post.praiseCount }}</span
        >
        <span class="article-ext-info" :title="post.viewCount"
          >阅读数：{{ post.viewCount }}</span
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import { getLogger } from "../../../util/logger";
const logger = getLogger("components/themes/default/PostList");
import { inBrowser } from "../../../util/dom";
import postApi from "../../../api/post";

export default {
  name: "Aside",
  created() {
    if (inBrowser) {
      this.getHotPostsData();
    }
  },
  data() {
    return {
      hotPosts: []
    };
  },
  methods: {
    getHotPostsData() {
      let that = this;
      postApi
        .getHotPostList({
          postType: "post",
          postStatus: "publish"
        })
        .then(resolve => {
          const postList = resolve.data;
          if (postList.code === 0) {
            that.hotPosts = postList.data;
          } else {
            that.$toaster.error(postList.msg);
          }
        })
        .catch(reason => {
          logger.error("getHotPostsData request error,reason=>" + reason);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#aside {
}
#aside .card {
  margin: 10px 0;
}
.article-ext {
  margin-top: 1.25rem;
  .btn {
    margin-right: 1.25rem;
  }
  .article-ext-info {
    margin-right: 1.25rem;
  }
}
</style>
