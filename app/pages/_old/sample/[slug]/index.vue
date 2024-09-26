<script setup lang="ts">
// @see https://nuxt.com/docs/guide/directory-structure/layouts#named-layout
definePageMeta({
  layout: false
})

const route = useRoute()

const breadcrumbs = computed(() => {
  return route.path.split('/').filter(Boolean)
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <template #title>
        <h1>
          Director Page
        </h1>
      </template>

      <template #breadcrumbs>
        <Breadcrumbs :links="breadcrumbs" />
      </template>

      Page Content
    </NuxtLayout>
  </div>
</template>
