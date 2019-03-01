<template>
  <div id="aside">
    <b-card title="图片热门文章" tag="article">
      <b-media style="margin-bottom: 1rem;">
        <b-img
          blank
          blank-color="#ccc"
          title="图片热门文章"
          alt="图片热门文章"
          style="width: 100%;height:200px;"
        />
      </b-media>
      <p class="card-text">
        这里是图片热门文章
      </p>
      <b-button href="#" variant="primary">立即查看</b-button>
    </b-card>
    <b-card title="文字热门文章" sub-title="文章副标题">
      <p class="card-text">
        这里是文字热门文章
      </p>
      <a href="#" class="card-link">链接1</a>
      <b-link href="#" class="card-link">链接2</b-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Aside"
};
</script>

<style scoped>
#aside {
}
#aside .card {
  margin: 10px 0;
}
</style>
