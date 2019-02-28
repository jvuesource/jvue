<template>
  <div id="postList">
    <b-card
      class="pic-text-article"
      tag="article"
      v-for="post in postList"
      :key="post.postId"
      :title="post.postFullTitle"
      sub-title="发布于5分钟前"
    >
      <b-media style="margin-bottom: 1rem;">
        <b-img
          slot="aside"
          src="https://picsum.photos/600/300/?image=25"
          blank-color="#ccc"
          width="200px;"
          height="100%;"
          alt="placeholder"
        />
        <h5>{{ post.postFullTitle }}</h5>
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
      <span class="article-ext-info" title="50000"
        >点赞数：{{ post.praiseCount }}</span
      >
      <span class="article-ext-info" title="1000"
        >阅读数：{{ post.viewCount }}</span
      >
      <span class="article-ext-info" title="200"
        >评论数：{{ post.commentCount }}</span
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
