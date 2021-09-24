<template>
  <div>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="留言"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button type="primary" round class="sub-btn" @click="subComment"
      >主要按钮</van-button
    >
  </div>
</template>

<script>
export default {
  props: {
    target: {
      required: true,
      type: [Number, String, Object]
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async subComment() {
      try {
        const { data: res } = await this.$axios.post('v1_0/comments', {
          target: this.target,
          content: this.message,
          art_id: null
        })
        console.log(res)
        this.message = ''
        this.$emit('postSuccess', res.data)
      } catch (err) {}
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ textarea {
  padding-right: 45px !important;
}
/deep/ .van-cell::after {
  border-bottom: none !important ;
}
.sub-btn {
  border: none;
  height: 60px;
  width: 80%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
