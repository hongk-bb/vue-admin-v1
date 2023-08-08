import type { IAccount, IRepassAccount } from '@/types'
import service from './axios'

export function login(data: IAccount): any {
  return service.post('/admin/login', data)
}

export function getinfo() {
  return service.post('/admin/getinfo')
}

export function logout() {
  return service.post('/admin/logout')
}

export function updatepassword(data: IRepassAccount) {
  return service.post('/admin/updatepassword', data)
}

export function getManagerList(page: any, query: any = {}): any {
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join('&')
  r = r ? '?' + r : ''

  return service.get(`/admin/manager/${page}${r}`)
}

export function updateManagerStatus(id: number, status: any) {
  return service.post(`/admin/manager/${id}/update_status`, {
    status
  })
}

export function createManager(data: any) {
  return service.post(`/admin/manager`, data)
}

export function updateManager(id: number, data: any) {
  return service.post(`/admin/manager/${id}`, data)
}

export function deleteManager(id: number) {
  return service.post(`/admin/manager/${id}/delete`)
}
