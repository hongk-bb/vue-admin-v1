import { defineStore } from 'pinia'
import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice
} from '@/api/notice'

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    totalCount: null as number | null,
    list: [] as any[]
  }),
  getters: {},
  actions: {
    async getNoticeListAction(page: number) {
      const res = await getNoticeList(page)
      this.totalCount = res?.totalCount
      this.list = res?.list
    },
    async createNoticeAction(data: any) {
      await createNotice(data)
    },
    async updateNoticeAction(id: number, data: any) {
      await updateNotice(id, data)
    },
    async deleteNoticeAction(id: number) {
      await deleteNotice(id)
    }
  }
})
