<script lang="ts" setup>
import { reactive, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const d = reactive({
  num: 0
})

function AnimateToValue() {
  gsap.to(d, {
    duration: 0.5,
    num: props.value
  })
}

AnimateToValue()

watch(
  () => props.value,
  () => AnimateToValue()
)
</script>

<template>
  {{ d.num.toFixed(0) }}
</template>

<style scoped></style>
