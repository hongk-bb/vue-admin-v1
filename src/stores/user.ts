import { defineStore } from 'pinia'
import {
  getUserList,
  updateUserStatus,
  createUser,
  updateUser,
  deleteUser
} from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({}),
  getters: {},
  actions: {
    async getUserListAction(page: any, query: any = {}) {
      const res = await getUserList(page, query)
      return res
    },
    async updateUserStatusAction(id: number, status: any) {
      await updateUserStatus(id, status)
    },
    async createUserAction(data: any) {
      await createUser(data)
    },
    async updateUserAction(id: number, data: any) {
      await updateUser(id, data)
    },
    async deleteUserAction(id: number) {
      await deleteUser(id)
    }
  }
})
