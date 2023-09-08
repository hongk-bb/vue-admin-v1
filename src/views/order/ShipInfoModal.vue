<script lang="ts" setup>
import { ref } from 'vue'
import { toast } from '@/utils/util'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()

const dialogVisible = ref(false)

const info = ref<any>({})
const open = (id: number) => {
  return orderStore.getShipInfoAction(id).then((res: any) => {
    if (res.status != 0) {
      return toast(res.msg, 'error')
    }
    info.value = res.result
    console.log(res.result)
    dialogVisible.value = true
  })
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer title="物流信息" v-model="dialogVisible" size="40%">
    <el-card shadow="never" class="border-0 mb-3">
      <div class="flex items-center">
        <el-image
          :src="info.logo"
          fit="fill"
          :lazy="true"
          style="width: 60px; height: 60px"
          class="rounded border"
        ></el-image>
        <div class="ml-3">
          <p>物流公司：{{ info.typename }}</p>
          <p>物流单号：{{ info.number }}</p>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" class="border-0 border-t">
      <el-timeline class="ml-[-40px]">
        <el-timeline-item
          :timestamp="item.time"
          placement="top"
          v-for="(item, index) in info.list"
          :key="index"
        >
          {{ item.status }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </el-drawer>
</template>

<style scoped></style>
