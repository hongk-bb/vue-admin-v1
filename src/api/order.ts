import service from './axios'

import { queryParams } from '@/utils/util'

export function getOrderList(page: number, query: any = {}) {
  let r = queryParams(query)
  return service.get(`/admin/order/${page}${r}`)
}

export function deleteOrder(ids: any) {
  return service.post(`/admin/order/delete_all`, {
    ids
  })
}

export function exportOrder(query: any = {}) {
  let r = queryParams(query)
  return service.post(
    `/admin/order/excelexport${r}`,
    {},
    {
      responseType: 'blob'
    }
  )
}

export function getShipInfo(id: number) {
  return service.get(`/admin/order/${id}/get_ship_info`)
}

export function refundOrder(id: number, data: any) {
  return service.post(`/admin/order/${id}/handle_refund`, data)
}
