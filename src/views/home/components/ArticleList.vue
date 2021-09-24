<template>
  <div class="articleList">
    <!-- pullfresh 要放在外面 -->
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
      success-duration="500"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, i) in list"
          :key="i"
          :article="article"
        ></article-item>
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem/index.vue'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      channel_id: this.channel.id,
      timestamp: this.timestamp || Date.now(),
      with_top: 1,
      error: false,
      isRefreshing: false
    }
  },
  methods: {
    // onLoad() {},
    async onLoad() {
      try {
        const { data: res } = await this.$axios.get('v1_1/articles', {
          params: {
            channel_id: this.channel.id,
            timestamp: this.timestamp,
            with_top: this.with_top
          }
        })
        this.list.push(...res.data.results)
        this.loading = false
        if (res.data.results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data: res } = await this.$axios.get('v1_1/articles', {
          params: {
            channel_id: this.channel.id,
            timestamp: Date.now(),
            with_top: this.with_top
          }
        })
        this.list.unshift(...res.data.results)
        this.isRefreshing = false
        if (res.data.results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.articleList {
  height: 79vh;
  overflow-y: auto;
}
</style>
