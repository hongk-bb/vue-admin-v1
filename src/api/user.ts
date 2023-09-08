import service from './axios'

import { queryParams } from '@/utils/util'

export function getUserList(page: any, query: any = {}) {
  let r = queryParams(query)
  return service.get(`/admin/user/${page}${r}`)
}

export function updateUserStatus(id: number, status: any) {
  return service.post(`/admin/user/${id}/update_status`, {
    status
  })
}

export function createUser(data: any) {
  return service.post(`/admin/user`, data)
}

export function updateUser(id: number, data: any) {
  return service.post(`/admin/user/${id}`, data)
}

export function deleteUser(id: number) {
  return service.post(`/admin/user/${id}/delete`)
}
