import type { IAccount } from '@/types'
import fyRequest from '.'

export function login(data: IAccount) {
  return fyRequest.post({
    url: '/admin/login',
    data,
  })
}
