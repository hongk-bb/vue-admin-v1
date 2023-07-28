import { defineStore } from 'pinia'
import { getStatistics1 } from '@/api/index'

export const useIndexStore = defineStore('index', {
  state: () => ({
    panels: [] as any[]
  }),
  getters: {},
  actions: {
    async getStatistics1Action() {
      const res = await getStatistics1()
      this.panels = res?.panels
    }
  }
})
