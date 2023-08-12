import service from './axios'
import { queryParams } from '@/utils/util'

export function getGoodsList(page: number, query: any = {}) {
  let r = queryParams(query)
  return service.get(`/admin/goods/${page}${r}`)
}

export function updateGoodsStatus(ids: any, status: any) {
  return service.post(`/admin/goods/changestatus`, {
    ids,
    status
  })
}

export function createGoods(data: any) {
  return service.post(`/admin/goods`, data)
}

export function updateGoods(id: number, data: any) {
  return service.post(`/admin/goods/${id}`, data)
}

export function deleteGoods(ids: number) {
  return service.post(`/admin/goods/delete_all`, {
    ids
  })
}
