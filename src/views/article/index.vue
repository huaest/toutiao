<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="content.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ content.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="content.aut_photo"
          />
          <div slot="title" class="user-name">{{ content.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ content.pubdate | computeTime }}
          </div>
          <!-- 自己封装的按钮组件，以便于后面的使用！ -->
          <follow-btn
            class="follow-btn"
            :content="content"
            @followChange="content.is_followed = !content.is_followed"
          ></follow-btn>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="content.content"
          ref="contentTree"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <van-popup
          v-model="showPop"
          closeable
          close-icon="close"
          position="bottom"
          :style="{ height: '20%' }"
        >
          <!-- 评论输入框 -->
          <comment-pop
            :target="content.art_id"
            @postSuccess="postSuccess"
          ></comment-pop>
        </van-popup>
        <comment-list
          :articleId="content.art_id"
          @commentNum="changeNum"
          :commentList="commentList"
        ></comment-list>

        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="showPop = true"
            >写评论</van-button
          >

          <van-icon name="comment-o" :info="comNum" color="#777" />
          <!-- 收藏文章按钮组件 -->
          <collect-article
            :content="content"
            :articleId="articleId"
            @changeCollect="content.is_collected = !content.is_collected"
          >
          </collect-article>
          <like-article
            :content="content"
            :articleId="articleId"
            @changeLike="changelike"
          ></like-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- /底部区域 -->
  </div>
</template>

<script>
import FollowBtn from '@/components/FollowBtn'
import { ImagePreview } from 'vant'
import CollectArticle from '@/components/CollectArticle'
import LikeArticle from '@/components/LikeArticle'
import CommentList from '@/views/article/components/CommentList'
import CommentPop from '@/views/article/components/CommentPop'
export default {
  data() {
    return {
      content: {},
      isLoading: false,
      errStatus: 0,
      comNum: 0,
      showPop: false,
      commentList: []
    }
  },
  components: {
    FollowBtn,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPop
  },
  props: {
    articleId: {
      required: true,
      type: [Number, String, Object]
    }
  },

  methods: {
    async getArticle() {
      try {
        //   因为数据中存在大数据，所以要对id进行处理,使用BigNumber
        const { data: res } = await this.$axios.get(
          `v1_0/articles/${this.articleId}`
        )
        this.content = res.data
        // 数据驱动的理解！！！
        setTimeout(() => {
          const tree = this.$refs.contentTree
          const imgs = tree.querySelectorAll('img')
          const img = []
          imgs.forEach((item, index) => {
            img.push(item.src)
            item.onclick = function () {
              ImagePreview({
                images: img,
                startPosition: index
              })
            }
          })
        }, 0)
        this.isLoading = false
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        // this.$toast.fail('获取文章数据失败')

        this.isLoading = false
      }
    },
    onClickLeft() {
      this.$router.back()
    },
    changelike() {
      if (this.content.attitude === 1) {
        this.content.attitude = -1
      } else if (this.content.attitude === -1) {
        this.content.attitude = 1
      }
    },
    changeNum(val) {
      this.comNum = val
    },
    postSuccess(data) {
      this.showPop = false
      this.comNum++
      this.commentList.unshift(data.new_obj)
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>
@import './art-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
