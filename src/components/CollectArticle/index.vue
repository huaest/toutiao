<template>
  <van-button
    :icon="content.is_collected ? 'star' : 'star-o'"
    :class="[{ 'btn-item': true }, { collectColor: content.is_collected }]"
    @click="collect"
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
    async collect() {
      console.log(this.content.aut_id)
      this.isLoading = true
      if (!this.content.is_collected) {
        try {
          await this.$axios.post('v1_0/article/collections', {
            target: this.articleId
          })

          this.$emit('changeCollect')
          this.isLoading = false
        } catch (err) {}
      } else {
        await this.$axios.delete(`v1_0/article/collections/${this.articleId}`)
        this.$emit('changeCollect')
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
.collectColor {
  color: yellow;
}
</style>
