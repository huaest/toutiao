<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <comment-item
      v-for="(v, i) in commentList"
      :key="i"
      :comment="v"
    ></comment-item>
  </van-list>
</template>

<script>
import CommentItem from '@/views/article/components/CommentItem'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      total: 0
    }
  },
  components: {
    CommentItem
  },
  props: {
    articleId: {
      required: true,
      type: [Object, Number, String]
    },
    commentList: {
      required: true,
      // 默认值
      default: () => []
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data: res } = await this.$axios.get('v1_0/comments', {
          params: {
            type: 'a',
            source: this.articleId,
            offset: this.offset,
            limit: this.limit
          }
        })
        if (res.data.results.length) {
          this.offset = res.data.last_id
        } else {
          this.offset = null
          this.loading = false
          this.finished = true
        }
        this.commentList.push(...res.data.results)
        this.total = res.data.total_count
        this.$emit('commentNum', this.total)
      } catch (err) {}
    }
  },
  created() {
    this.onLoad()
  }
}
</script>

<style lang="less" scoped>
</style>
