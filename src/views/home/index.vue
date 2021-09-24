<template>
  <div class="home-container">
    <!-- 搜索区域 -->
    <van-nav-bar fixed>
      <van-button
        class="sear-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >
        搜索</van-button
      >
    </van-nav-bar>

    <!-- tab页 -->
    <!-- 只能在有内容的地方滑动 -->
    <van-tabs v-model="active" border animated swipeable>
      <van-tab :title="v.name" v-for="v in channels" :key="v.id">
        <!-- 组件化开发！ -->
        <article-list :channel="v"></article-list>
      </van-tab>
      <div slot="nav-right" class="place"></div>
      <div slot="nav-right" class="ham-btn">
        <i class="iconfont icon-gengduo" @click="show = true"></i>
      </div>
    </van-tabs>
    <!-- 弹出层！ -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <pop-up
        :channels="channels"
        :active="active"
        @channel-change="channelChange"
      ></pop-up>
    </van-popup>
  </div>
</template>

<script>
import { getItem } from '@/utils/storage.js'
import PopUp from './components/PopoUp.vue'
import ArticleList from './components/ArticleList.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  components: {
    ArticleList,
    PopUp
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getChannels() {
      // 获取文章列表
      if (this.user) {
        try {
          const { data: res } = await this.$axios.get('/v1_0/user/channels')
          this.channels = res.data.channels
        } catch (err) {
          this.$toast.fail('获取文章列表失败')
        }
      } else {
        console.log(getItem('local-channel'))
        this.channels = getItem('local-channel')
      }
    },
    channelChange(index, isShow = true) {
      this.active = index
      this.show = isShow
    }
  },
  created() {
    this.getChannels()
  }
}
</script>
ß
<style lang="less" >
.van-ellipsis {
  max-width: unset !important;
}
.sear-btn {
  border: none;
  background-color: rgb(70, 157, 255);
  color: white !important;
  width: 555px;
  height: 64px;
  line-height: 64px;
  font-size: 28px;
  .van-icon {
    color: white;
    font-size: 32px;
  }
}
// 如果修改后样式改变，可以查看修改前的代码
.van-tabs__wrap {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 90px;
  height: 82px;
  .van-tab {
    font-size: 30px;
    min-width: 200px;
  }
  .van-tabs__nav {
    padding-bottom: none !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px !important;
    background-color: rgb(43, 113, 243) !important;
  }
  .van-tab--active {
    color: rgb(99, 102, 233);
  }
  .place {
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }
  .ham-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.902;
    border-left: 1px solid #ccc;

    i.iconfont {
      font-size: 33px;
    }
  }
}
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
}
</style>
