import { defineStore } from 'pinia'

import {
  getGoodsCommentList,
  updateGoodsCommentStatus,
  reviewGoodsComment
} from '@/api/goods_comment'

export const useGoodsCommentStore = defineStore('goodsComment', {
  state: () => ({}),
  getters: {},
  actions: {
    async getGoodsCommentListAction(page: number, query: any = {}) {
      const res = await getGoodsCommentList(page, query)
      return res
    },
    async updateGoodsCommentStatusAction(ids: any, status: any) {
      await updateGoodsCommentStatus(ids, status)
    },
    async reviewGoodsCommentAction(id: number, data: any) {
      await reviewGoodsComment(id, data)
    }
  }
})
