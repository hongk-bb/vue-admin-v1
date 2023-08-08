import { defineStore } from 'pinia'
import { getImageList, updateImage, deleteImage } from '@/api/image'

export const useImageStore = defineStore('image', {
  state: () => ({}),
  getters: {},
  actions: {
    async getImageListAction(id: number, page: number | null) {
      const res = await getImageList(id, page)
      return res
    },
    async updateImageAction(id: number, name: string) {
      await updateImage(id, name)
    },
    async deleteImageAction(ids: any) {
      await deleteImage(ids)
    }
  }
})
