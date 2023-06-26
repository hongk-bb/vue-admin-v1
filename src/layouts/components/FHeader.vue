<script lang="ts" setup>
import { useManagerStore } from '@/stores/manager'
import { storeToRefs } from 'pinia'

const managerStore = useManagerStore()
const { user } = storeToRefs(managerStore)
</script>

<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><eleme-filled /></el-icon>
      商城后台
    </span>
    <el-icon class="icon-btn"><fold /></el-icon>
    <el-icon class="icon-btn"><refresh /></el-icon>
    <div class="ml-auto flex items-center">
      <el-icon class="icon-btn"><full-screen /></el-icon>
      <el-dropdown class="dropdown">
        <span class="flex items-center text-gray-100">
          <el-avatar class="mr-2" :size="25" :src="user?.avatar" />
          {{ user?.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.f-header {
  @apply flex items-center bg-blue-600 text-white fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-blue-500;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}

:focus-visible {
  outline: none;
}
</style>
