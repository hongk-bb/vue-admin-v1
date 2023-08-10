import { defineStore } from 'pinia'
import {
  getRoleList,
  createRole,
  updateRole,
  updateRoleStatus,
  deleteRole,
  setRoleRules
} from '@/api/role'

export const useRoleStore = defineStore('role', {
  state: () => ({}),
  getters: {},
  actions: {
    async getRoleListAction(page: number) {
      const res = await getRoleList(page)
      return res
    },
    async createRoleAction(data: any) {
      await createRole(data)
    },
    async updateRoleAction(id: number, data: any) {
      await updateRole(id, data)
    },
    async updateRoleStatusAction(id: number, status: any) {
      await updateRoleStatus(id, status)
    },
    async deleteRoleAction(id: number) {
      await deleteRole(id)
    },
    async setRoleRulesAction(id: number, rule_ids: number) {
      await setRoleRules(id, rule_ids)
    }
  }
})
