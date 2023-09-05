<script lang="ts" setup>
import { ref, reactive } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'
import Editor from '@/components/Editor.vue'
import { toast } from '@/utils/util'
import { useGoodsStore } from '@/stores/goods'

const goodsStore = useGoodsStore()

const formDrawerRef = ref<any>(null)

const form = reactive({
  content: ''
})

const goodsId = ref(0)
const open = (row: any) => {
  goodsId.value = row.id
  row.contentLoading = true
  goodsStore
    .readGoodsAction(goodsId.value)
    .then((res: any) => {
      form.content = res.content
      formDrawerRef.value.open()
    })
    .finally(() => {
      row.contentLoading = false
    })
}
const emit = defineEmits(['reloadData'])

const submit = () => {
  formDrawerRef.value.showLoading()
  goodsStore
    .updateGoodsAction(goodsId.value, form)
    .then(() => {
      toast('设置商品详情成功')
      formDrawerRef.value.close()
      emit('reloadData')
    })
    .finally(() => {
      formDrawerRef.value.hideLoading()
    })
}

defineExpose({
  open
})
</script>

<template>
  <FormDrawer
    ref="formDrawerRef"
    title="设置商品详情"
    @submit="submit"
    destroy-on-close
  >
    <el-form :model="form">
      <el-form-item>
        <Editor v-model="form.content" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<style scoped></style>
