<script lang="ts" setup>
import { ref } from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import { useInitTable } from '@/hooks/useCommon'
import { useRuleStore } from '@/stores/rule'

const ruleStore = useRuleStore()

const defaultExpandedKeys = ref([])
const { loading, tableData, getData } = useInitTable({
  getList: ruleStore.getRuleListAction,
  onGetListSuccess: (res: any) => {
    tableData.value = res.list
    defaultExpandedKeys.value = res.list.map((o: any) => o.id)
  }
})
</script>

<template>
  <el-card shadow="never" class="border-0">
    <ListHeader @refresh="getData" />
    <el-tree
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      v-loading="loading"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
    />
  </el-card>
</template>

<style scoped></style>
