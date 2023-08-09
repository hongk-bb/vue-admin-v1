import { defineStore } from 'pinia'
import { getRuleList } from '@/api/rule'

export const useRuleStore = defineStore('rule', {
  state: () => ({}),
  getters: {},
  actions: {
    async getRuleListAction(page: number) {
      const res = await getRuleList(page)
      return res
    }
  }
})
