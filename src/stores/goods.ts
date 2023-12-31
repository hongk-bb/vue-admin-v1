import { defineStore } from 'pinia'

import {
  getGoodsList,
  updateGoodsStatus,
  createGoods,
  updateGoods,
  deleteGoods,
  readGoods,
  setGoodsBanner,
  updateGoodsSkus,
  createGoodsSkusCard,
  updateGoodsSkusCard,
  deleteGoodsSkusCard,
  sortGoodsSkusCard,
  createGoodsSkusCardValue,
  updateGoodsSkusCardValue,
  deleteGoodsSkusCardValue,
  chooseAndSetGoodsSkusCard,
  restoreGoods,
  destroyGoods
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
    },
    async updateGoodsSkusAction(id: number, data: any) {
      await updateGoodsSkus(id, data)
    },
    async createGoodsSkusCardAction(data: any) {
      await createGoodsSkusCard(data)
    },
    async updateGoodsSkusCardAction(id: number, data: any) {
      await updateGoodsSkusCard(id, data)
    },
    async deleteGoodsSkusCardAction(id: number) {
      await deleteGoodsSkusCard(id)
    },
    async sortGoodsSkusCardAction(data: any) {
      await sortGoodsSkusCard(data)
    },
    async createGoodsSkusCardValueAction(data: any) {
      await createGoodsSkusCardValue(data)
    },
    async updateGoodsSkusCardValueAction(id: number, data: any) {
      await updateGoodsSkusCardValue(id,data)
    },
    async deleteGoodsSkusCardValueAction(id: number) {
      await deleteGoodsSkusCardValue(id)
    },
    async chooseAndSetGoodsSkusCardAction(id: number, data: any) {
      await chooseAndSetGoodsSkusCard(id,data)
    },
    async restoreGoodsAction(ids: any) {
      await restoreGoods(ids)
    },
    async destroyGoodsAction(ids: any) {
      await destroyGoods(ids)
    }
  }
})
