import { defineStore } from 'pinia'

import {
  getCouponList,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  updateCouponStatus
} from '@/api/coupon'

export const useCouponStore = defineStore('coupon', {
  state: () => ({}),
  getters: {},
  actions: {
    async getCouponListAction(page: number) {
      const res = await getCouponList(page)
      return res
    },
    async createCouponAction(data: any) {
      await createCoupon(data)
    },
    async updateCouponAction(id: number, data: any) {
      await updateCoupon(id, data)
    },
    async deleteCouponAction(id: number) {
      await deleteCoupon(id)
    },
    async updateCouponStatusAction(id: number) {
      await updateCouponStatus(id)
    }
  }
})
