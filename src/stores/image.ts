import { defineStore } from 'pinia'
import { getImageList, updateImage, deleteImage } from '@/api/image'

export const useImageStore = defineStore('image', {
  state: () => ({
    totalCount: null as number | null,
    list: [] as any[]
  }),
  getters: {},
  actions: {
    async getImageListAction(id: number, page: number | null) {
      const res = await getImageList(id, page)
      this.totalCount = res?.totalCount
      this.list = res?.list
    },
    async updateImageAction(id: number, name: string) {
      await updateImage(id, name)
    },
    async deleteImageAction(ids: any) {
      await deleteImage(ids)
    }
  }
})
