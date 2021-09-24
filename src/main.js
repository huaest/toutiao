import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 先倒入vant
import Vant from 'vant'

import '@/utils/request.js'

// iconfont字体图标的使用｜｜ css的导入及其运行
import '@/style/iconfont/iconfont.css'
import '@/style/index.less'

// 倒入vant 的css样式
import 'vant/lib/index.less'
import 'vant/lib/icon/local.css'

// 动态设置root大小, 因为要使用rem单位｜｜vue-cli默认设置了postcss无需再下载包
import 'amfe-flexible'
// 之后可以在所有的vue文件中使用 vant

// 导入 dayjs
import '@/utils/day.js'
Vue.use(Vant)
// 这一句？？？
Vue.config.productionTip = false

new Vue({
  // 全局使用router和store
  router,
  store,
  render: h => h(App)
}).$mount('#app')
