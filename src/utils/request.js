import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import jsonBig from 'json-bigint'

Vue.prototype.$axios = axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://toutiao-app.itheima.net/'
axios.defaults.transformResponse = [
  function(data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }
]
axios.interceptors.request.use(
  function(config) {
    const { user } = store.state
    // 数据必须要存在，否则报错
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // // 务必要返回
    return config
  },
  function(err) {
    return Promise.reject(err)
  }
)
