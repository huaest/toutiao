<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('closeBir')"
      @confirm="changeBir"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    bir: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      currentDate: new Date(this.bir),
      minDate: new Date(1990, 0, 1),
      maxDate: new Date()
    }
  },
  methods: {
    async changeBir(val) {
      try {
        await this.$axios.patch('v1_0/user/profile', {
          birthday: dayjs(val).format('YYYY-MM-DD')
        })
        this.$emit('changeBir', dayjs(val).format('YYYY-MM-DD'))
      } catch (err) {}
    }
  }
}
</script>

<style lang="less" scoped>
</style>
