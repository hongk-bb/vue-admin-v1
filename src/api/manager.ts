import type { IAccount } from '@/types'
import service from '.'

export function login(data: IAccount): any {
  return service.post('/admin/login', data)
}

export function getinfo(): any {
  return service.post('/admin/getinfo')
}
