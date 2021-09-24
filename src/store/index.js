import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('token')
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem('token', JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
