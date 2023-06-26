import type { IAccount, IRepassAccount } from '@/types'
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

export function updatepassword(data: IRepassAccount) {
  return service.post('/admin/updatepassword', data)
}
