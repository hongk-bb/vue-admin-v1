import type { IAccount } from '@/types'
import service from '.'

export function login(data: IAccount): any {
  return service.post('/admin/login', data)
}

export function getinfo() {
  return service.post('/admin/getinfo')
}

export function logout() {
  return service.post('/admin/logout')
}
