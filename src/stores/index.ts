import { defineStore } from 'pinia'
import { getStatistics1, getStatistics2, getStatistics3 } from '@/api/index'

export const useIndexStore = defineStore('index', {
  state: () => ({
    panels: [] as any[],
    options: {} as any,
    goods: [] as any[],
    order: [] as any[]
  }),
  getters: {},
  actions: {
    async getStatistics1Action() {
      const res = await getStatistics1()
      this.panels = res?.panels
    },
    async getStatistics2Action() {
      const res = await getStatistics2()
      this.goods = res?.goods
      this.order = res?.order
    },
    async getStatistics3Action(type: string) {
      const res = await getStatistics3(type)
      this.options = res
    }
  }
})
