<template>
  <div class="bc">
    <img :src="img" alt="" ref="img" />
    <div class="toolBar">
      <div class="cancel" @click="$emit('closeImg')">取消</div>
      <div class="ok" @click="sub">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  props: {
    img: {
      required: true,
      type: [String, Object]
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  methods: {
    cancel() {},
    sub() {
      this.$toast.loading('正在保存')
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formdata = new FormData()
        formdata.append('photo', blob)
        try {
          const { data: res } = await this.$axios.patch(
            'v1_0/user/photo',
            formdata
          )
          this.$toast.success('保存成功')
          this.$emit('changeImg', res.photo)
        } catch (err) {
          this.$toast.fail('保存失败')
        }
      })
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  }
}
</script>

<style lang="less" scoped>
.bc {
  background-color: black;
  height: 100%;
  width: 100%;
  img {
    max-width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .toolBar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .ok,
    .cancel {
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      font-size: 30px;
      color: white;
    }
  }
}
</style>
