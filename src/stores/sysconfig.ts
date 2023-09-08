import { defineStore } from 'pinia'
import { getSysconfig, setSysconfig } from '@/api/sysconfig'

export const useSysconfigStore = defineStore('sysconfig', {
  state: () => ({}),
  getters: {},
  actions: {
    async getSysconfigAction() {
      const res = await getSysconfig()
      return res
    },
    async setSysconfigAction(data: any) {
      await setSysconfig(data)
    }
  }
})
