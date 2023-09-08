import { defineStore } from 'pinia'

import {
  getCategoryList,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
  getCategoryGoods,
  deleteCategoryGoods,
  connectCategoryGoods
} from '@/api/category'

export const useCategoryStore = defineStore('category', {
  state: () => ({}),
  getters: {},
  actions: {
    async getCategoryListAction() {
      const res = await getCategoryList()
      return res
    },
    async createCategoryAction(data: any) {
      await createCategory(data)
    },
    async updateCategoryAction(id: number, data: any) {
      await updateCategory(id, data)
    },
    async updateCategoryStatusAction(id: number, status: any) {
      await updateCategoryStatus(id, status)
    },
    async deleteCategoryAction(id: number) {
      await deleteCategory(id)
    },
    async getCategoryGoodsAction(id: number) {
      const res = await getCategoryGoods(id)
      return res
    },
    async deleteCategoryGoodsAction(id: number) {
      await deleteCategoryGoods(id)
    },
    async connectCategoryGoodsAction(data: any) {
      await connectCategoryGoods(data)
    }
  }
})
