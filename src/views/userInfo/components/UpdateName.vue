<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="完成"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="field"></div>
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      label="留言"
      type="textarea"
      maxlength="10"
      placeholder="请输入留言"
      show-word-limit
      border
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  methods: {
    async onClickRight() {
      if (this.message.length === 0) {
        return this.$toast.fail('名称不能为空')
      }
      await this.$axios.patch('v1_0/user/profile', {
        name: this.message
      })

      this.$emit('changeName', this.message)
    },
    onClickLeft() {
      this.$emit('closePop')
    }
  }
}
</script>

<style lang="less" scoped>
.field {
  padding: 10px;
}
</style>
