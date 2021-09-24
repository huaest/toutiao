<template>
  <div class="channel-edit">
    <van-cell class="cell">
      <div slot="title">我的频道</div>
      <van-button type="primary" size="mini" round @click="edit">{{
        isEdit ? '完成' : '编辑'
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="delete-edit">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in channels"
        :key="index"
        icon="clear"
        @click="changeChannel(value, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixChannels.includes(value.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          value.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell class="cell">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="commend-edit">
      <van-grid-item
        class="grid-item"
        v-for="(value, i) in computeChannels"
        :key="i"
        :text="value.name"
        @click="addItem(value)"
      >
        <van-icon slot="icon" name="plus" v-show="isEdit === true"></van-icon>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fixChannels: [0]
    }
  },
  props: {
    channels: {
      required: true,
      type: Array
    },
    active: {
      required: true,
      type: Number
    }
  },
  computed: {
    ...mapState(['user']),
    //   因为要时刻监听用户的选择，所以要用计算属性！！！
    computeChannels() {
      const newChannels = []
      this.allChannels.forEach((channel) => {
        //   找到符合条件的元素
        const res = this.channels.find((my) => {
          return my.id === channel.id
        })
        if (!res) {
          newChannels.push(channel)
        }
      })
      return newChannels
    }
  },
  methods: {
    //   所有频道请求模块
    async getChannels() {
      try {
        const { data: res } = await this.$axios.get('v1_0/channels')
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast.fail('获取列表失败')
      }
    },
    async addItem(item) {
      if (this.isEdit === true) {
        this.channels.push(item)
        if (this.user) {
          try {
            //   每添加一个发送请求
            await this.$axios.patch('v1_0/user/channels', {
              channels: [
                {
                  id: item.id,
                  seq: this.channels.length
                }
              ]
            })
          } catch (err) {
            this.$toast.fail('数据保存失败,请用浏览器访问！')
          }
        } else {
          setItem('local-channel', this.channels)
        }
      }
    },
    edit() {
      this.isEdit = !this.isEdit
    },
    // 只适用于父子组件传值！！
    changeChannel(channel, index) {
      if (!this.isEdit) {
        this.$emit('channel-change', index, false)
      } else {
        //   固定不能删除的数据
        if (this.fixChannels.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('channel-change', this.active - 1, true)
        }
        // 数组的删除操作，是对原数组的操作！！！
        this.channels.splice(index, 1)
        if (this.user) {
          this.deleteChannel(channel)
        } else {
          setItem('local-channel', this.channels)
        }
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        try {
          await this.$axios.delete(`v1_0/user/channels/${channel.id}`)
        } catch (err) {
          this.$toast.fail('数据存储失败')
        }
      } else {
      }
    }
  },
  created() {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
}
.delete-edit {
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      flex-direction: row;
      font-size: 28px;
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        z-index: 2;
      }
      .van-grid-item__text,
      .text {
        font-size: 25px;
        margin-top: 10px;
      }
    }
  }
}
.commend-edit {
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      overflow: hidden;
      background-color: #f4f5f6;
      flex-direction: row;
      font-size: 28px;
      .van-icon {
        font-size: 24px;
      }
      .van-grid-item__text {
        margin-top: 10px;
      }
    }
  }
}

.active {
  color: red;
}
</style>
