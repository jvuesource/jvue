<template>
  <div id="postList">
    <b-card
      class="pic-text-article"
      tag="article"
      v-for="post in postList"
      :key="post.postId"
      :title="post.postFullTitle === '' ? '无标题' : post.postFullTitle"
      sub-title="发布于5分钟前"
    >
      <b-media style="margin-bottom: 1rem;">
        <b-img
          v-if="post.thumbnails.length > 0"
          slot="aside"
          :src="post.thumbnails[0]"
          blank-color="#ccc"
          width="200"
          height="100"
          :title="post.postFullTitle === '' ? '无标题' : post.postFullTitle"
          :alt="post.postFullTitle === '' ? '无标题' : post.postFullTitle"
        />
        <p class="card-text">
          {{ post.postDesc }}
        </p>
      </b-media>
      <b-button
        :href="
          post.postSlug === ''
            ? 'post/' + post.postId + '.html'
            : 'post/' + post.postSlug + '.html'
        "
        variant="primary"
        >查看全文</b-button
      >
      <span class="article-ext-info">作者：Terwer</span>
      <span class="article-ext-info" :title="post.praiseCount"
        >点赞数：{{ post.praiseCount }}</span
      >
      <span class="article-ext-info" :title="post.viewCount"
        >阅读数：{{ post.viewCount }}</span
      >
      <span class="article-ext-info" :title="post.commentCount"
        >评论数3：{{ post.commentCount }}</span
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PostList",
  props: {
    postList: Array
  }
};
</script>

<style lang="scss">
#postList {
}
#postList .card {
  margin: 10px 0;
}
/**
图片带文字的文章
*/
.pic-text-article {
  .card-subtitle {
    font-size: 14px;
  }
  .article-ext-info {
    margin-left: 1.25rem;
  }
}
</style>
