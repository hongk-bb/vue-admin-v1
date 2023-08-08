<script lang="ts" setup>
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'
import { ref } from 'vue'

const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40

const ImageAsideRef = ref<any>(null)
const handleOpenCreate = () => ImageAsideRef?.value.handleCreate()

const ImageMainRef = ref<any>(null)
const handleAsideChange = (image_class_id: number) =>
  ImageMainRef?.value.loadData(image_class_id)

const handleOpenUpload = () => ImageMainRef?.value.openUploadFile()
</script>

<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate">
        新增图片分类
      </el-button>
      <el-button type="warning" size="small" @click="handleOpenUpload">
        上传图片
      </el-button>
    </el-header>
    <el-container>
      <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
      <ImageMain ref="ImageMainRef" />
    </el-container>
  </el-container>
</template>

<style scoped>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>
