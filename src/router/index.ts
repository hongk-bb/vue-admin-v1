import { createRouter, createWebHashHistory } from 'vue-router'

import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { hideFullLoading, showFullLoading, toast } from '@/utils/util'
import { useManagerStore } from '@/stores/manager'

import Admin from '../layouts/Admin.vue'
import Home from '../views/home/Home.vue'
import NotFound from '../views/notfound/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Admin',
    component: Admin,
    // 子路由
    children: [
      {
        path: '/',
        component: Home,
        meta: {
          title: '后台首页'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/userform/Login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // console.log('to, from', to, from)

  // 显示loading
  showFullLoading()

  const token = localCache.getCache(LOGIN_TOKEN)

  // 没有登录，强制跳转回登录页
  if (!token && to.path != '/login') {
    toast('请先登录', 'error')
    return next({ path: '/login' })
  }

  // 防止重复登录
  if (token && to.path == '/login') {
    toast('请勿重复登录', 'error')
    return next({ path: from.path ? from.path : '/' })
  }

  // 如果用户登录了，自动获取用户信息
  const managerStore = useManagerStore()
  if (token && !managerStore.user) {
    managerStore.getInfoAction()
  }

  // 设置页面标题
  const title = (to.meta.title ? to.meta.title : '') + '-商城后台'
  document.title = title

  next()
})

// 全局后置守卫
router.afterEach(() => hideFullLoading())

export default router
