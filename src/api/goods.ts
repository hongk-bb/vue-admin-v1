import service from './axios'
import { queryParams } from '@/utils/util'

export function getGoodsList(page: number, query: any = {}) {
  let r = queryParams(query)
  return service.get(`/admin/goods/${page}${r}`)
}

// 批量上架/下架
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

export function deleteGoods(ids: any) {
  return service.post(`/admin/goods/delete_all`, {
    ids
  })
}

export function restoreGoods(ids: any) {
  return service.post(`/admin/goods/restore`, {
    ids
  })
}

export function destroyGoods(ids: any) {
  return service.post(`/admin/goods/destroy`, {
    ids
  })
}

export function readGoods(id: number) {
  return service.get(`/admin/goods/read/${id}`)
}

export function setGoodsBanner(id: number, data: any) {
  return service.post(`/admin/goods/banners/${id}`, data)
}

export function updateGoodsSkus(id: number, data: any) {
  return service.post(`/admin/goods/updateskus/${id}`, data)
}

export function createGoodsSkusCard(data: any) {
  return service.post(`/admin/goods_skus_card`, data)
}

export function updateGoodsSkusCard(id: number, data: any) {
  return service.post(`/admin/goods_skus_card/${id}`, data)
}

export function deleteGoodsSkusCard(id: number) {
  return service.post(`/admin/goods_skus_card/${id}/delete`)
}

export function sortGoodsSkusCard(data: any) {
  return service.post(`/admin/goods_skus_card/sort`, data)
}

export function createGoodsSkusCardValue(data: any) {
  return service.post(`/admin/goods_skus_card_value`, data)
}

export function updateGoodsSkusCardValue(id: number, data: any) {
  return service.post(`/admin/goods_skus_card_value/${id}`, data)
}

export function deleteGoodsSkusCardValue(id: number) {
  return service.post(`/admin/goods_skus_card_value/${id}/delete`)
}

export function chooseAndSetGoodsSkusCard(id: number, data: any) {
  return service.post(`/admin/goods_skus_card/${id}/set`, data)
}
