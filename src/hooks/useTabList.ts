import { localCache } from '@/utils/cache'
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import router from '@/router'
import { TAB_LIST } from '@/global/constants'

export const useTabList = () => {
  const route = useRoute()

  // 当前激活的标签
  const activeTab = ref(route.path)
  const tabList = ref([
    {
      title: '后台首页',
      path: '/'
    }
  ])

  // 添加标签导航
  function addTab(tab: any) {
    let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
    if (noTab) {
      tabList.value.push(tab)
    }

    localCache.setCache(TAB_LIST, tabList.value)
  }

  // 初始化标签导航列表
  function initTabList() {
    let tbs = localCache.getCache(TAB_LIST)
    if (tbs) {
      tabList.value = tbs
    }
  }

  initTabList()

  // 路由切换时，添加标签导航
  onBeforeRouteUpdate(to => {
    activeTab.value = to.path
    addTab({
      title: to.meta.title,
      path: to.path
    })
  })

  const changeTab = (t: string) => {
    activeTab.value = t
    router.push(t)
  }

  const removeTab = (t: string) => {
    let tabs = tabList.value
    let a = activeTab.value
    if (a == t) {
      tabs.forEach((tab, index) => {
        if (tab.path == t) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            a = nextTab.path
          }
        }
      })
    }

    activeTab.value = a
    tabList.value = tabList.value.filter(tab => tab.path != t)

    localCache.setCache(TAB_LIST, tabList.value)
  }

  const handleClose = (c: string) => {
    if (c == 'clearAll') {
      // 切换回首页
      activeTab.value = '/'
      // 过滤只剩下首页
      tabList.value = [
        {
          title: '后台首页',
          path: '/'
        }
      ]
    } else if (c == 'clearOther') {
      // 过滤只剩下首页和当前激活
      tabList.value = tabList.value.filter(
        tab => tab.path == '/' || tab.path == activeTab.value
      )
    }
    localCache.setCache(TAB_LIST, tabList.value)
  }

  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
  }
}
