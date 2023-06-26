<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { useManagerStore } from '@/stores/manager'
import { toast } from '@/utils/util'
import router from '@/router'

const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  callback()
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  }
  callback()
}
const ruleForm = reactive({
  username: '',
  password: ''
})
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
})

const managerStore = useManagerStore()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      loading.value = true
      // console.log(ruleForm)
      managerStore
        .loginAction(ruleForm)
        .then(res => {
          // console.log('res', res)
          toast('登录成功')

          managerStore.getInfoAction().then(() => {
            router.push('/')
          })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      return false
    }
  })
}

// 添加键盘监听
const keydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    submitForm(ruleFormRef.value)
  }
}
onMounted(() => {
  window.addEventListener('keydown', keydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', keydown)
})
</script>

<template>
  <el-row class="min-h-screen bg-blue-500">
    <el-col class="flex_center" :lg="16" :md="12">
      <div>
        <div class="font-bold text-5xl text-gray-100 mb-4">欢迎光临</div>
        <div class="text-gray-200 text-sm">
          技术栈《vue3 + vite + pinia + tailwind + element-plus》
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="bg-gray-50 flex_center flex-col">
      <div class="title flex flex-col justify-center items-center pt-10">
        <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
        <div
          class="flex items-center justify-center my-5 text-gray-300 space-x-2"
        >
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
      </div>
      <el-form
        ref="ruleFormRef"
        label-position="top"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="7.5rem"
        class="w-52"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="ruleForm.username">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#3B82F6"
            class="w-[250px]"
            type="primary"
            @click="submitForm(ruleFormRef)"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style>
.flex_center {
  @apply flex justify-center items-center;
}
</style>
@/utils/util @/stores @/stores
