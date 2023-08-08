import { defineStore } from 'pinia'

import {
  getinfo,
  login,
  logout,
  updatepassword,
  getManagerList,
  updateManagerStatus,
  createManager,
  updateManager,
  deleteManager
} from '@/api/manager'

import type { IAccount, IRepassAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

export const useManagerStore = defineStore('manager', {
  state: () => ({
    user: null as any,
    asideCollapsed: false,
    menus: [] as any[],
    ruleNames: [] as any[]
  }),
  getters: {
    getAsideWidth(state) {
      return state.asideCollapsed ? '64px' : '250px'
    }
  },
  actions: {
    async loginAction(data: IAccount) {
      const res = await login(data)
      localCache.setCache(LOGIN_TOKEN, res?.token)
    },
    async getInfoAction() {
      if (!this.user) {
        const res = await getinfo()
        this.user = res
        // console.log('get !!! user:', this.user)
      }
      this.menus = this.user?.menus
      this.ruleNames = this.user?.ruleNames
      // console.log('get !!! menus:', this.menus)
      // console.log('get !!! ruleNames:', this.ruleNames)
    },
    async logoutAction() {
      await logout()
      localCache.removeCache(LOGIN_TOKEN)
    },
    async updatepasswordAction(data: IRepassAccount) {
      await updatepassword(data)
    },
    handleAsideWidthAction() {
      this.asideCollapsed = !this.asideCollapsed
    },
    async getManagerListAction(page: any, query: any = {}) {
      const res = await getManagerList(page, query)
      return res
    },
    async updateManagerStatusAction(id: number, status: any) {
      await updateManagerStatus(id, status)
    },
    async createManagerAction(data: any) {
      await createManager(data)
    },
    async updateManagerAction(id: number, data: any) {
      await updateManager(id, data)
    },
    async deleteManagerAction(id: number) {
      await deleteManager(id)
    }
  }
})
