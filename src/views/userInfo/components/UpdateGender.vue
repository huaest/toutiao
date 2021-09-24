<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    gender: {
      required: true,
      tyep: Number
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      index: 0
    }
  },
  methods: {
    async onConfirm(val) {
      //   调用接口
      if (val === '男') {
        try {
          await this.$axios.patch('v1_0/user/profile', {
            gender: this.index
          })
          this.$toast.success('修改成功')
        } catch (err) {}
      }
      console.log(val)
      this.$emit('changeGender', val === '男' ? 0 : 1)
    },
    onChange(p, v, i) {
      console.log(i)
      this.index = i
    },
    onCancel() {
      this.$emit('closeGender')
    }
  }
}
</script>

<style>
</style>
