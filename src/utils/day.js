import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import Vue from 'vue'

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

Vue.filter('computeTime', value => {
  return dayjs().to(dayjs('2015'))
})
