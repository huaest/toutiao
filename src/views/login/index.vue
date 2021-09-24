<template>
  <div>
    <!-- 左箭头点击事件 -->
    <van-nav-bar left-arrow title="登入" @click-left="onClickLeft" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="手机号"
        v-model="user.mobile"
        maxlength="11"
        type="number"
        :rules="userForm.mobile"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        type="password"
        name="code"
        placeholder="验证码"
        v-model="user.code"
        :rules="userForm.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="count"
            :time="time"
            @finish="closeC"
            format="ss"
          />

          <!-- 这里要设置native-type 否则会触发表单验证 -->
          <van-button
            v-else
            class="msgBtn"
            size="small"
            @click="getCode"
            native-type="button"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import { login } from '@/api'
export default {
  data() {
    return {
      user: {
        mobile: '13911111112',
        code: '246810'
      },
      userForm: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onBlur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'onBlur' }]
      },
      count: false,
      time: 1000 * 5
    }
  },
  methods: {
    // 验证码的finish事件
    closeC() {
      this.count = false
    },
    onClickLeft() {
      // 哪里来哪里去
      // this代表当前组件
      this.$router.back()
    },
    // 获取验证码
    async getCode() {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return this.$toast.fail('请填写手机号')
      }
      this.count = true
      try {
        await this.$axios.get(`v1_0/sms/codes/${this.user.mobile}`)
      } catch (err) {
        // 关闭验证倒计时
        this.count = false
        // 提示频繁发送
        if (err.response.status === 429) {
          return this.$toast.fail('频繁发送')
        }
      }
    },
    // 表单提交发送请求
    async onSubmit() {
      // 加载提示ui
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const user = this.user
      try {
        const { data: res } = await this.$axios.post('/v1_0/authorizations', {
          ...user
        })
        this.$toast.success('登入成功')
        this.$store.commit('setUser', res.data)
        this.$router.push('/')
      } catch (err) {
        this.$toast.fail('登入失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 37px;
}
.msgBtn {
  width: 156px;
  height: 46px;
  line-height: 46px;
  color: #666;
}
</style>
