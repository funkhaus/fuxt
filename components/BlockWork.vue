<script setup lang="ts">
import type { FunkyImageProps } from '~/types'

// Define the props for the component
withDefaults(defineProps<{
  to: string
  title: string
  image: FunkyImageProps
  director?: string
  description?: string
  tags?: string[]
}>(), {
  title: 'Default Title'
})

// Define component variables

const metaHeight = ref<number | string>(0)

const funkyImageEl = ref<HTMLImageElement>()

// Define watchers
watch(metaHeight, () => {
  console.log('metaHeight changed', metaHeight.value)
})

// Define computed properties

const styles = computed(() => {
  return { '--meta-height': `${metaHeight.value}px` }
})

// Define custom methods

const setMetaHeight = () => {
  if (!funkyImageEl.value) return

  // @ts-expect-error Ignore TS error for now
  metaHeight.value = funkyImageEl.value.imageEl.getBoundingClientRect().height
}

// Define lifescycle hooks

onMounted(() => {
  if (!funkyImageEl.value) return

  setMetaHeight()
})

const playVideo = () => {
  // @ts-expect-error Ignore TS error for now
  console.log('funkyImageEl', funkyImageEl.value?.handleAction())
}

const onIsPlaying = () => {
  alert('Video is playing!')
}
</script>

<template>
  <div
    class="wrapper"
  >
    <NuxtLink
      :to="to"
      :styles="styles"
    >
      <slot
        name="before"
        :title
        :meta-height
      >
        <!-- Default Slot Content -->
        <h3 class="title-red">
          {{ title }} | {{ metaHeight }}
        </h3>
      </slot>

      <FunkyImage
        v-if="image"
        ref="funkyImageEl"
        :image="image"
        @is-playing="onIsPlaying"
      />
    </NuxtLink>

    <button @click="playVideo">
      Play Video
    </button>
  </div>
</template>

<style lang="postcss" scoped>
@media (--small-viewport) {
  .wrapper {
    background-color: blue;
  }
}
</style>
