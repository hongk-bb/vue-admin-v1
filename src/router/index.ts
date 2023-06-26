import { createRouter, createWebHashHistory } from 'vue-router'

import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { hideFullLoading, showFullLoading, toast } from '@/utils/util'
import { useManagerStore } from '@/stores/manager'

import Admin from '../layouts/Admin.vue'
import Login from '../views/login/Login.vue'
import NotFound from '../views/notfound/NotFound.vue'
import { storeToRefs } from 'pinia'

// 默认路由，所有用户共享
const routes = [
  {
    path: '/',
    name: 'admin',
    component: Admin
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound
  }
]

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: () => import('../views/Index.vue'),
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: () => import('../views/goods/GoodsList.vue'),
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: () => import('../views/category/CategoryList.vue'),
    meta: {
      title: '分类列表'
    }
  }
]

// 动态添加路由的方法
const addRoutes = (menus: any[]): boolean => {
  // 是否有新的路由
  let hasNewRoutes = false

  const findAndAddRoutesByMenus = (arr: any[]) => {
    arr.forEach(e => {
      let item = asyncRoutes.find(o => o.path === e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin', item)
        hasNewRoutes = true
      }

      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }

  findAndAddRoutesByMenus(menus)

  return hasNewRoutes
}

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
  let hasNewRoutes = false
  if (token) {
    await managerStore.getInfoAction().finally(() => {
      hasNewRoutes = addRoutes(managerStore.menus)
    })
  }

  // 设置页面标题
  const title = (to.meta.title ? to.meta.title : '') + '-商城后台'
  document.title = title

  // console.log(managerStore.user)
  // console.log('hasNewRoutes?', hasNewRoutes)
  // console.log('router', router.getRoutes())

  // 防止死循环
  hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach(() => hideFullLoading())

export default router
