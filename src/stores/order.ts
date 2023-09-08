import { defineStore } from 'pinia'

import {
  getOrderList,
  deleteOrder,
  exportOrder,
  getShipInfo,
  refundOrder
} from '@/api/order'

export const useOrderStore = defineStore('order', {
  state: () => ({}),
  getters: {},
  actions: {
    async getOrderListAction(page: number, query: any = {}) {
      const res = await getOrderList(page, query)
      return res
    },
    async deleteOrderAction(ids: any) {
      await deleteOrder(ids)
    },
    async exportOrderAction(query: any = {}) {
      await exportOrder(query)
    },
    async getShipInfoAction(id: number) {
      const res = await getShipInfo(id)
      return res
    },
    async refundOrderAction(id: number, data: any) {
      await refundOrder(id, data)
    }
  }
})
