<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
    <input type="file" ref="file" hidden @change="onFileChange" />
    <van-popup
      v-if="imgShow"
      v-model="imgShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-img
        :img="img"
        @changeImg="changeImg"
        @closeImg="imgShow = false"
      ></update-img>
    </van-popup>
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo">
      </van-image>
    </van-cell>
    <van-cell
      title="昵称"
      @click="nameShow = true"
      :value="user.name"
      is-link
    ></van-cell>
    <van-popup
      v-if="nameShow"
      v-model="nameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-model="user.name"
        @closePop="nameShow = false"
        @changeName="changeName"
      ></update-name>
    </van-popup>
    <van-cell
      title="性别"
      :value="user.gender === 1 ? '女' : '男'"
      @click="genderShow = true"
      is-link
    ></van-cell>
    <van-popup
      v-if="genderShow"
      v-model="genderShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <update-gender
        :gender="user.gender"
        @closeGender="genderShow = false"
        @changeGender="changeGender"
      ></update-gender>
    </van-popup>
    <van-cell
      title="生日"
      :value="user.birthday"
      @click="birShow = true"
      is-link
    ></van-cell>
    <van-popup
      v-if="birShow"
      v-model="birShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <update-bir
        :bir="user.birthday"
        @closeBir="birShow = false"
        @changeBir="changeBir"
      ></update-bir>
    </van-popup>
  </div>
</template>

<script>
import UpdateName from './components/UpdateName.vue'
import UpdateGender from '@/views/userInfo/components/UpdateGender'
import UpdateBir from '@/views/userInfo/components/UpdateBir'
import UpdateImg from '@/views/userInfo/components/UpdateImg'
export default {
  data() {
    return {
      user: {},
      nameShow: false,
      genderShow: false,
      birShow: false,
      imgShow: false,
      img: ''
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBir,
    UpdateImg
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getInfo() {
      const { data: res } = await this.$axios.get('v1_0/user/profile')
      this.user = res.data
    },
    changeName(val) {
      this.nameShow = false
      this.user.name = val
    },
    changeGender(val) {
      this.genderShow = false
      this.user.gender = val
    },
    changeBir(val) {
      this.user.birthday = val
      this.birShow = false
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      this.imgShow = true
      //   清空才能出发change事件
      this.$refs.file.value = ''
      this.img = data
    },
    changeImg(val) {
      this.img = val
      this.imgShow = false
    }
  },
  created() {
    this.getInfo()
  }
}
</script>

<style>
.avatar {
  width: 70px;
  height: 70px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
