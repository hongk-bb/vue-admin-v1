import { defineStore } from 'pinia'
import { getinfo, login } from '@/api/manager'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

export const useManagerStore = defineStore('manager', {
  state: () => ({
    user: {}
  }),
  getters: {},
  actions: {
    async loginAction(data: IAccount) {
      const res = await login(data)
      localCache.setCache(LOGIN_TOKEN, res?.token)
    },
    async getInfoAction() {
      const res = await getinfo()
      this.user = res
    }
  }
})
