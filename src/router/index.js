import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        component: () => import('@/views/home')
      },
      { path: '/video', component: () => import('@/views/video') },
      { path: '/discussion', component: () => import('@/views/discussion') },
      { path: '/my', component: () => import('@/views/my') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // 这种写法要掌握
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  },
  {
    path: '/userInfo',
    component: () => import('@/views/userInfo')
  }
]

const router = new VueRouter({
  routes,
  meta: {
    keepAlive: true
  }
})

export default router
