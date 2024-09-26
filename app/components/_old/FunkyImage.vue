<script setup lang="ts">
import type { FunkyImageProps } from '~/types'

defineProps<{
  image: FunkyImageProps
}>()

const emit = defineEmits<{
  isPlaying: [value: boolean]
}>()

const handleAction = () => {
  alert('Video would be playing!')
}

const imageEl = ref<HTMLImageElement>()

defineExpose({
  imageEl,
  handleAction,
  isPlaying: false
})
</script>

<template>
  <img
    ref="imageEl"
    :src="image.src"
    style="min-height: 100px"
    @mouseover="emit('isPlaying', true)"
  >

  <h4 class="name">
    Drew Baker
  </h4>
</template>

<style scoped>

</style>
