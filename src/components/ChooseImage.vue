<script lang="ts" setup>
import { ref } from 'vue'
import ImageAside from './ImageAside.vue'
import ImageMain from './ImageMain.vue'

const dialogVisible = ref(false)

const open = () => (dialogVisible.value = true)
const close = () => (dialogVisible.value = false)

const ImageAsideRef = ref<any>(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()

const ImageMainRef = ref<any>(null)
const handleAsideChange = (image_class_id: number) =>
  ImageMainRef.value.loadData(image_class_id)

const handleOpenUpload = () => ImageMainRef.value.openUploadFile()

const props = defineProps({
  modelValue: [String, Array]
})
const emit = defineEmits(['update:modelValue'])

let urls: any = []
const handleChoose = (e: any) => {
  urls = e.map((o: any) => o.url)
}

const submit = () => {
  if (urls.length) {
    emit('update:modelValue', urls[0])
  }
  close()
}
</script>

<template>
  <div v-if="modelValue">
    <el-image
      :src="modelValue"
      fit="cover"
      class="w-[100px] h-[100px] rounded border mr-2"
    ></el-image>
  </div>

  <div class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-500"><Plus /></el-icon>
  </div>
  <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
    <el-container class="bg-white rounded" style="height: 70vh">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate"
          >新增图片分类</el-button
        >
        <el-button type="warning" size="small" @click="handleOpenUpload"
          >上传图片</el-button
        >
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
        <ImageMain openChoose ref="ImageMainRef" @choose="handleChoose" />
      </el-container>
    </el-container>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:bg-gray-100;
}
</style>
