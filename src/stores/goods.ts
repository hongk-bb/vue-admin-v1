import { defineStore } from 'pinia'

import {
  getGoodsList,
  updateGoodsStatus,
  createGoods,
  updateGoods,
  deleteGoods,
  readGoods,
  setGoodsBanner
} from '@/api/goods'

export const useGoodsStore = defineStore('goods', {
  state: () => ({}),
  getters: {},
  actions: {
    async getGoodsListAction(page: number, query: any = {}) {
      const res = await getGoodsList(page, query)
      return res
    },
    async updateGoodsStatusAction(ids: any, status: any) {
      await updateGoodsStatus(ids, status)
    },
    async createGoodsAction(data: any) {
      await createGoods(data)
    },
    async updateGoodsAction(id: number, data: any) {
      await updateGoods(id, data)
    },
    async deleteGoodsAction(ids: number) {
      await deleteGoods(ids)
    },
    async readGoodsAction(id: number) {
      const res = await readGoods(id)
      return res
    },
    async setGoodsBannerAction(id: number, data: any) {
      await setGoodsBanner(id, data)
    }
  }
})