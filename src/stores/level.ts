import { defineStore } from 'pinia'

import {
  getUserLevelList,
  createUserLevel,
  updateUserLevel,
  deleteUserLevel,
  updateUserLevelStatus
} from '@/api/level'

export const useLevelStore = defineStore('level', {
  state: () => ({}),
  actions: {
    async getUserLevelListAction(page: number) {
      const res = await getUserLevelList(page)
      return res
    },
    async createUserLevelAction(data: any) {
      await createUserLevel(data)
    },
    async updateUserLevelAction(id: number, data: any) {
      await updateUserLevel(id, data)
    },
    async deleteUserLevelAction(id: number) {
      await deleteUserLevel(id)
    },
    async updateUserLevelStatusAction(id: number, status: any) {
      await updateUserLevelStatus(id, status)
    }
  }
})
