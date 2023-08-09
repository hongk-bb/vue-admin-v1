import { defineStore } from 'pinia'
import {
  getRuleList,
  createRule,
  updateRule,
  updateRuleStatus,
  deleteRule
} from '@/api/rule'

export const useRuleStore = defineStore('rule', {
  state: () => ({}),
  getters: {},
  actions: {
    async getRuleListAction(page: number) {
      const res = await getRuleList(page)
      return res
    },
    async createRuleAction(data: any) {
      await createRule(data)
    },
    async updateRuleAction(id: number, data: any) {
      await updateRule(id, data)
    },
    async updateRuleStatusAction(id: number, status: any) {
      await updateRuleStatus(id, status)
    },
    async deleteRuleAction(id: number) {
      await deleteRule(id)
    }
  }
})
