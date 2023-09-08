import service from './axios'

import { queryParams } from '@/utils/util'

export function getGoodsCommentList(page: number, query: any = {}) {
  let r = queryParams(query)
  return service.get(`/admin/goods_comment/${page}${r}`)
}

export function updateGoodsCommentStatus(id: number, status: any) {
  return service.post(`/admin/goods_comment/${id}/update_status`, {
    status
  })
}

export function reviewGoodsComment(id: number, data: any) {
  return service.post(`/admin/goods_comment/review/${id}`, {
    data
  })
}
