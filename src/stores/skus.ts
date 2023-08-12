import { defineStore } from 'pinia'
import {
  getSkusList,
  createSkus,
  updateSkus,
  deleteSkus,
  updateSkusStatus
} from '@/api/skus'

export const useSkusStore = defineStore('skus', {
  state: () => ({}),
  getters: {},
  actions: {
    async getSkusListAction(page: number) {
      const res = await getSkusList(page)
      return res
    },
    async createSkusAction(data: any) {
      await createSkus(data)
    },
    async updateSkusAction(id: number, data: any) {
      await updateSkus(id, data)
    },
    async updateSkusStatusAction(id: number, status: any) {
      await updateSkusStatus(id, status)
    },
    async deleteSkusAction(id: number) {
      await deleteSkus(id)
    }
  }
})
