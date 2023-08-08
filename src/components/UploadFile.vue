<script lang="ts" setup>
import { uploadImageAction } from '@/api/image'
import { toast } from '@/utils/util'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const token = localCache.getCache(LOGIN_TOKEN)

defineProps({
  data: Object
})

const emit = defineEmits(['success'])

const uploadSuccess = (response: any, uploadFile: any, uploadFiles: any) => {
  console.log(response)
  emit('success', {
    response,
    uploadFile,
    uploadFiles
  })
}

const uploadError = (error: any, uploadFile: any, uploadFiles: any) => {
  let msg = JSON.parse(error.message).msg || '上传失败'
  toast(msg, 'error')
}
</script>

<template>
  <el-upload
    drag
    :action="uploadImageAction"
    multiple
    :headers="{ token }"
    name="img"
    :data="data"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<style scoped></style>
