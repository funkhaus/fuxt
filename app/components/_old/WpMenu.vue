<script setup lang="ts">
defineProps<{
  title: string
}>()

const { data } = await useWpFetch(`/pages`)

const links = computed(() => {
  return data.value?.map(item => ({
    id: item.id,
    title: item.title.rendered,
    url: item.link.split('https://fuxt-backend.funkhaus.us')[1]
  })) || []
})
</script>

<template>
  <nav>
    <h2>
      {{ title }} <slot />
    </h2>

    <ul>
      <li>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </li>
      <li
        v-for="link of links"
        :key="link.id"
      >
        <NuxtLink
          :to="link.url"
        >
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
