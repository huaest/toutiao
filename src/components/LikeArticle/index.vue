<template>
  <van-button
    :icon="content.attitude === 1 ? 'good-job' : 'good-job-o'"
    :class="[{ 'btn-item': true }, { likeColor: content.attitude === 1 }]"
    @click="like"
    :loading="isLoading"
  ></van-button>
</template>

<script>
export default {
  props: {
    articleId: {
      required: true,
      type: [Number, String, Object]
    },
    content: {
      required: true,
      type: [Object]
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async like() {
      this.isLoading = true
      if (this.content.attitude === -1) {
        try {
          const { data: res } = await this.$axios.post('v1_0/article/likings', {
            target: this.articleId
          })
          this.$emit('changeLike')
          console.log(res)
          this.isLoading = false
        } catch (err) {}
      } else {
        const { data: res } = await this.$axios.delete(
          `v1_0/article/likings/${this.articleId}`
        )
        console.log(res)
        this.$emit('changeLike')
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-item {
  border: none;
}
.likeColor {
  color: red;
}
</style>
