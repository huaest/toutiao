<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :loading="btn_loading"
    icon="plus"
    @click="follow"
    v-if="!content.is_followed"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    size="small"
    :loading="btn_loading"
    @click="follow"
    v-else-if="content.is_followed"
    >已关注</van-button
  >
</template>

<script>
export default {
  props: {
    content: {
      required: true,
      type: [Object]
    }
  },
  data() {
    return {
      btn_loading: false
    }
  },
  methods: {
    async follow() {
      this.btn_loading = true
      if (!this.content.is_followed) {
        try {
          await this.$axios.post('v1_0/user/followings', {
            target: this.content.aut_id
          })
          // this.content.is_followed = !this.content.is_followed
          this.$emit('followChange')
        } catch (err) {
          if (err.response && err.response.status === 400) {
            this.$toast.fail('不能关注自己')
          }
        }
      } else {
        try {
          await this.$axios.delete(
            `v1_0/user/followings/${this.content.aut_id}`
          )
          // this.content.is_followed = !this.content.is_followed
          this.$emit('followChange')
        } catch (err) {}
      }
      this.btn_loading = false
    }
  }
}
</script>

<style>
</style>
