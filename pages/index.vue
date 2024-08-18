<script setup lang="ts">
useSeoMeta({
  title: 'Home Page'
})

const menuStore = useOtherMenuStore()
</script>

<template>
  <div>
    <p>
      menu sidebar is: {{ menuStore.isOpen }}
    </p>

    <button @click="menuStore.toggle">
      Toggle Menu Sidebar
    </button>

    <hr>

    <BlockWork
      to="/"
      title="The Block"
      :image="{ src: 'https://placehold.co/600x400/EEE/31343C' }"
    />
  </div>
</template>
