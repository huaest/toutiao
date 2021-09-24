<template>
  <div>
    <van-cell
      v-for="(v, index) in adviceList"
      :key="index"
      @click="$emit('search', v)"
      icon="search"
      clickable
    >
      <span slot="title" v-html="highlight(v)"></span>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    searchText: {
      require: true,
      type: String
    }
  },
  data() {
    return {
      adviceList: []
    }
  },
  methods: {
    async getAdvice() {
      const { data: res } = await this.$axios.get('v1_0/suggestion', {
        params: {
          q: this.searchText
        }
      })

      this.adviceList = res.data.options
    },
    highlight(v) {
      // 如何动态的使用正则表达式？
      const reg = new RegExp(this.searchText, 'gi')
      // （v1，v2）  v1=被替换   v2=要替换成
      return v.replace(reg, `<span class="active">${this.searchText}</span>`)
    }
  },
  // 监听属性的使用
  watch: {
    searchText: {
      // 设置防抖，debounce
      // 第一个参数是一个函数
      // 第二个参数是一个延迟时间，只要再触发就会再延迟这么多时间
      handler: debounce(function (v) {
        this.getAdvice()
      }, 200),
      // 重要！！！
      // 组件还没渲染出来就监听
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ span .active {
  color: rgb(32, 156, 240) !important;
}
</style>
