import { defineStore } from 'pinia'
import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass
} from '@/api/image_class'

export const useImageClassStore = defineStore('imageClass', {
  state: () => ({
    totalCount: null as number | null,
    list: [] as any[]
  }),
  getters: {},
  actions: {
    async getImageClassListAction(page: number) {
      const res = await getImageClassList(page)
      this.totalCount = res?.totalCount
      this.list = res?.list
    },
    async createImageClassAction(data: any) {
      await createImageClass(data)
    },
    async updateImageClassAction(id: number, data: any) {
      await updateImageClass(id, data)
    },
    async deleteImageClassAction(id: number) {
      deleteImageClass(id)
    }
  }
})
