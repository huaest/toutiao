<template>
  <div>
    <form action="/" class="container">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
        class="searform"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isShowResult" :searchText="searchText"></search-result>
    <!-- 搜索建议 -->
    <search-advice
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></search-advice>
    <!-- 搜索历史 -->
    <search-history v-else></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/SearchHistory.vue'
import SearchAdvice from '@/views/search/components/SearchAdvice.vue'
import SearchResult from '@/views/search/components/SearchResult.vue'
export default {
  data() {
    return {
      searchText: '',
      isShowResult: false
    }
  },
  components: {
    SearchHistory,
    SearchAdvice,
    SearchResult
  },
  methods: {
    onSearch(v) {
      this.searchText = v
      this.isShowResult = true
    },
    onCancel() {
      this.$router.push('/')
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.searform {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
}
.container {
  padding-top: 108px;
}
.van-search {
  background-color: rgb(58, 145, 245);
  .van-search__action {
    color: white;
  }
}
</style>
