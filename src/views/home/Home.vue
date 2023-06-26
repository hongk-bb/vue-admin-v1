<script lang="ts" setup>
import { useManagerStore } from '@/stores/manager'
import { toast, showModal } from '@/utils/util'
import router from '@/router'

const managerStore = useManagerStore()
const logout = () => {
  showModal('是否要退出登录？').then(res => {
    managerStore.logoutAction().finally(() => {
      // 跳转回登录页
      router.push('/login')
      // 提示退出登录成功
      toast('退出登录成功')
    })
  })
}
</script>

<template>
  <div class="Home">
    {{ managerStore.user?.username }}
    <el-button @click="logout"> 退出登录 </el-button>
  </div>
</template>

<style scoped></style>
@/utils/util
