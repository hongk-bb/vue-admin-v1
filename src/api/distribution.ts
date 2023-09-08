import service from './axios'

import { queryParams } from '@/utils/util'

export function getAgentList(page: any, query: any = {}) {
  let r = queryParams(query)
  return service.get(`/admin/agent/${page}${r}`)
}

export function getAgentOrderList(page: any, query: any = {}) {
  let r = queryParams(query)
  return service.get(`/admin/user_bill/${page}${r}`)
}

export function getAgentStatistics() {
  return service.get('/admin/agent/statistics')
}

export function getConfig() {
  return service.get(`/admin/distribution_setting/get`)
}

export function setConfig(data: any) {
  return service.post(`/admin/distribution_setting/set`, data)
}
