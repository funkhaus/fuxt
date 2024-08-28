<script setup lang="ts">
defineProps<{
  links: string[]
}>()
</script>

<template>
  <nav>
    <ul>
      <li
        v-for="(entry, i) of links"
        :key="i"
      >
        {{ entry }}
      </li>
    </ul>
  </nav>
</template>
