<script setup lang="ts">

</script>

<template>
  <div>
    <Teleport to="#menu-teleport">
      <nav
        class="filter"
        style="font-size: x-large;"
      >
        Filter menu here
      </nav>
    </Teleport>

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
  </div>
</template>

<style scoped>
.filter {
  color: red;
}
</style>
