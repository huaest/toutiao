<template>
  <!-- 可以用es6，或者vue的语法 -->
  <!-- router的name来跳转！！ -->
  <van-cell
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }"
  >
    <div slot="title" class="van-multi-ellipsis--l3">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-img" v-if="article.cover.type == 3">
        <div
          class="cover-item"
          v-for="(img, i) in article.cover.images"
          :key="i"
        >
          <van-image class="imgs" fit="cover" :src="img" />
        </div>
      </div>
      <div class="text">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span style="margin-left: 10px">{{
          article.pubdate | computeTime
        }}</span>
      </div>
    </div>
    <div slot="default" v-if="article.cover.type == 1">
      <van-image
        width="100"
        height="100"
        fit="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>

<style lang="less" scoped>
.cover-img {
  display: flex;
  padding: 30px 0;
  .cover-item {
    flex: 1;
    height: 146px;
    .imgs {
      height: 146px;
      width: 100%;
    }
  }
}
</style>
