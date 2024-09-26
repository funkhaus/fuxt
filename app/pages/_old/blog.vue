<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <ul>
        <li>
          <NuxtLink to="/">
            Blog Post 1
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            Blog Post 2
          </NuxtLink>
        </li>
      </ul>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.filter {
  color: red;
}
</style>
