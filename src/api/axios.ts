import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { ElNotification } from 'element-plus'
import axios from 'axios'
import { toast } from '@/utils/util'
import { useManagerStore } from '@/stores/manager'

const service = axios.create({
  baseURL: '/api'
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 往header头自动添加token
    const token = localCache.getCache(LOGIN_TOKEN)
    if (token) {
      config.headers['token'] = token
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data.data
  },
  function (error) {
    // 对响应错误做点什么
    let msg = error.response.data.msg || '请求失败'

    if (msg.length > 10) {
      return Promise.resolve(error)
    }

    if (msg == '非法token，请先登录！') {
      const managerStore = useManagerStore()
      managerStore.logoutAction().finally(() => location.reload())
    }

    toast(msg, 'error')

    return Promise.reject(error)
  }
)

export default service
