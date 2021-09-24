<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(v, i) in resultList" :key="i" :title="v.title" />
    </van-list>
  </div>
</template>

<script>
export default {
  props: {
    searchText: {
      require: true,
      type: String
    }
  },
  data() {
    return {
      finished: false,
      loading: false,
      page: 1,
      perpage: 20,
      resultList: []
    }
  },
  methods: {
    async getResult() {},
    // 这一个只要一加载就会调用
    async onLoad() {
      try {
        const { data: res } = await this.$axios.get('v1_0/search', {
          params: {
            page: this.page,
            per_page: this.perpage,
            q: this.searchText
          }
        })
        this.resultList.push(...res.data.results)
        this.loading = false
        if (res.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('数据获取失败')
        this.loading = false
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
