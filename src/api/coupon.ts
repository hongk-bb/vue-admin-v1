import service from './axios'

export function getCouponList(page: number): any {
  return service.get(`/admin/coupon/${page}`)
}

export function createCoupon(data: any) {
  return service.post('/admin/coupon', data)
}

export function updateCoupon(id: number, data: any) {
  return service.post('/admin/coupon/' + id, data)
}

export function deleteCoupon(id: number) {
  return service.post(`/admin/coupon/${id}/delete`)
}

export function updateCouponStatus(id: number) {
  return service.post(`/admin/coupon/${id}/update_status`, {
    status: 0
  })
}
