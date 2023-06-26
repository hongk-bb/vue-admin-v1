import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/manager'
import type { IAccount } from '@/types'

export const useManagerStore = defineStore('manager', {
  state: () => ({
    token: ''
  }),
  getters: {},
  actions: {
    async loginAtion(data: IAccount) {
      const res = await login(data)
    }
  }
})
