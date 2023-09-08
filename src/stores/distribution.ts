import { defineStore } from 'pinia'

import {
  getAgentList,
  getAgentOrderList,
  getAgentStatistics,
  getConfig,
  setConfig
} from '@/api/distribution'

export const useDistributionStore = defineStore('distribution', {
  state: () => ({}),
  getters: {},
  actions: {
    async getAgentListAction(page: any, query: any = {}) {
      const res = await getAgentList(page, query)
      return res
    },
    async getAgentOrderListAction(page: any, query: any = {}) {
      const res = await getAgentOrderList(page, query)
      return res
    },
    async getAgentStatisticsAction() {
      const res = await getAgentStatistics()
      return res
    },
    async getConfigAction() {
      const res = await getConfig()
      return res
    },
    async setConfigAction(data: any) {
      await setConfig(data)
    }
  }
})
