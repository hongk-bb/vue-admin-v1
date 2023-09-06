<script lang="ts" setup>
import { initSkusCardItem } from '@/hooks/useSku'

const props = defineProps({
  skuCardId: [Number, String] as any
})

const {
  item,
  inputValue,
  inputVisible,
  InputRef,
  handleClose,
  showInput,
  handleInputConfirm
} = initSkusCardItem(props.skuCardId)
</script>

<template>
  <el-tag
    v-for="(tag, index) in item.goodsSkusCardValue"
    :key="index"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
    effect="plain"
  >
    {{ tag.text }}
  </el-tag>
  <el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
    + New Tag
  </el-button>
</template>

<style scoped></style>
