<template>
  <div class="container">
    <div class="user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image round fit="cover" class="avatar" :src="userInfo.photo" />
          <span style="color: white">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/userInfo">编辑资料</van-button>
        </div>
      </div>
      <div class="data-state">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header" v-else>
      <!-- 这里不同this因为就是本组件 -->
      <div class="avatar-container" @click="$router.push('/login')">
        <div class="avatar"><img src="" alt="" /></div>
        <span class="login">登入/注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- cell -->

    <van-cell title="消息通知" is-link></van-cell>
    <van-cell title="小智同学" is-link></van-cell>
    <van-button class="logout" v-if="user" @click="logout">退出登入</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userInfo: ''
    }
  },
  created() {
    if (this.user) {
      this.getUserInfo()
    }
  },
  methods: {
    logout() {
      // 使用vant 的$dialog来提示是否退出！
      this.$dialog
        .confirm({
          title: '确认退出吗'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUserInfo() {
      try {
        // 请求头的写法！
        const { data: res } = await this.$axios.get('v1_0/user')
        this.userInfo = res.data
      } catch (err) {
        this.$toast.fail('获取用户数据失败')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 361px;
    background-color: pink;
    .avatar-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 200px;
        height: 200px;
        background-color: white;
        border-radius: 100px;
      }
      .login {
        margin-top: 15px;
        font-size: 30px;
      }
    }
  }
  .user-info {
    background-color: green;
    .base-info {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      padding: 30px;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          border: 4px solid white;
          width: 132px;
          height: 132px;
          margin-right: 30px;
        }
      }
    }
    .data-state {
      width: 100%;
      height: 130px;
      display: flex;
      justify-content: space-around;
      .data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 130px;
        .count {
          color: white;
          font-size: 36px;
        }
        .text {
          color: white;
          font-size: 23px;
        }
      }
    }
  }
  .grid-item {
    height: 141px;
    .icon-shoucang {
      color: rgb(240, 54, 54);
      font-size: 45px;
    }
    .icon-lishi {
      color: rgb(230, 215, 10);
      font-size: 45px;
    }
    span {
      font-size: 28px;
    }
  }
  .logout {
    position: relative;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    color: red;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
