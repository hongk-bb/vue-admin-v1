import { defineStore } from 'pinia'

import { getCategoryList } from '@/api/category'

export const useCategoryStore = defineStore('category', {
  state: () => ({}),
  getters: {},
  actions: {
    async getCategoryListAction() {
      const res = await getCategoryList()
      return res
    }
  }
})
