<script lang="ts" setup>
import { ref, reactive } from 'vue'
import ChooseImage from '@/components/ChooseImage.vue'

import { toast } from '@/utils/util'
import { useGoodsStore } from '@/stores/goods'

const goodsStore = useGoodsStore()

const dialogVisible = ref(false)

const form = reactive({
  banners: []
})

const goodsId = ref(0)
const open = (row: any) => {
  goodsId.value = row.id
  row.bannersLoading = true
  goodsStore
    .readGoodsAction(goodsId.value)
    .then((res: any) => {
      form.banners = res.goodsBanner.map((o: any) => o.url)
      dialogVisible.value = true
    })
    .finally(() => {
      row.bannersLoading = false
    })
}
const emit = defineEmits(['reloadData'])
const loading = ref(false)
const submit = () => {
  loading.value = true
  goodsStore
    .setGoodsBannerAction(goodsId.value, form)
    .then(() => {
      toast('设置轮播图成功')
      dialogVisible.value = false
      emit('reloadData')
    })
    .finally(() => {
      loading.value = false
    })
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    title="设置轮播图"
    v-model="dialogVisible"
    size="50%"
    destroy-on-close
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="轮播图">
        <ChooseImage :limit="9" v-model="form.banners" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="loading"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped></style>
