<script lang="ts" setup>
import router from '@/router'
import { useManagerStore } from '@/stores/manager'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const defaultActive = ref(router.currentRoute.value.path)
const managerStore = useManagerStore()

interface MenuItem {
  name: string
  icon: string
  frontpath?: string
  child?: MenuItem[]
}

const { menus } = storeToRefs(managerStore)

const handleSelect = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="f-menu" :style="{ width: managerStore.getAsideWidth }">
    <el-menu
      :default-active="defaultActive"
      class="el-menu"
      @select="handleSelect"
      :collapse="managerStore.asideCollapsed"
      :collapse-transition="false"
      unique-opened
    >
      <template v-for="(item, index) in (menus as any)" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name + index"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.f-menu {
  @apply shadow-md fixed bg-gray-100 transition-all overflow-x-hidden overflow-y-auto left-0 bottom-0;
  top: 64px;
}

.el-menu {
  @apply border-0;
}

.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>
