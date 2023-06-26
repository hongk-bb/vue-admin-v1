import { defineStore } from 'pinia'
import { getinfo, login, logout, updatepassword } from '@/api/manager'
import type { IAccount, IRepassAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

export const useManagerStore = defineStore('manager', {
  state: () => ({
    user: null as any
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
    },
    async logoutAction() {
      await logout()
      localCache.removeCache(LOGIN_TOKEN)
    },
    async updatepasswordAction(data: IRepassAccount) {
      await updatepassword(data)
    }
  }
})
