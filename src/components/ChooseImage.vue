<script lang="ts" setup>
import { ref } from 'vue'
import ImageAside from './ImageAside.vue'
import ImageMain from './ImageMain.vue'
import { toast } from '@/utils/util'

const dialogVisible = ref<any>(false)

const callbackFunction = ref<any>(null)
const open = (callback: any = null) => {
  callbackFunction.value = callback
  dialogVisible.value = true
}
const close = () => (dialogVisible.value = false)

const ImageAsideRef = ref<any>(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()

const ImageMainRef = ref<any>(null)
const handleAsideChange = (image_class_id: number) =>
  ImageMainRef.value.loadData(image_class_id)

const handleOpenUpload = () => ImageMainRef.value.openUploadFile()

const props = defineProps({
  modelValue: [String, Array] as any,
  limit: {
    type: Number,
    default: 1
  },
  preview: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:modelValue'])

let urls: any = []
const handleChoose = (e: any) => {
  urls = e.map((o: any) => o.url)
}

const submit = () => {
  let value = []
  if (props.limit == 1) {
    value = urls[0]
  } else {
    value = props.preview ? [...props.modelValue, ...urls] : [...urls]
    if (value.length > props.limit) {
      let limit = props.preview
        ? props.limit - props.modelValue.length
        : props.limit
      return toast('最多还能选择' + limit + '张')
    }
  }
  if (value && props.preview) {
    emit('update:modelValue', value)
  }
  if (!props.preview && typeof callbackFunction.value === 'function') {
    callbackFunction.value(value)
  }
  close()
}

const removeImage = (url: any) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((u: any) => u !== url)
  )
}

defineExpose({
  open
})
</script>

<template>
  <div v-if="modelValue">
    <el-image
      v-if="typeof modelValue == 'string'"
      :src="modelValue"
      fit="cover"
      class="w-[100px] h-[100px] rounded border mr-2"
    ></el-image>
    <div v-else class="flex flex-wrap">
      <div class="img-box" v-for="(url, index) in modelValue" :key="index">
        <el-icon
          class="img-icon"
          style="z-index: 1000"
          @click="removeImage(url)"
          ><CircleClose
        /></el-icon>
        <el-image :src="url" fit="cover" class="img-image"></el-image>
      </div>
    </div>
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
        <ImageMain
          :limit="limit"
          openChoose
          ref="ImageMainRef"
          @choose="handleChoose"
        />
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

.img-box {
  @apply relative mx-1 mb-2 w-[100px] h-[100px];
}

.img-box .img-icon {
  @apply absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full;
}

.img-box .img-image {
  @apply w-[100px] h-[100px] rounded border mr-2;
}
</style>
