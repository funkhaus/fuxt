<script setup lang="ts">
useSeoMeta({
  title: 'About Page'
})

// definePageMeta({
//   layout: 'demo'
// })

const videoEmbed = useVideoEmbed('https://www.youtube.com/watch?v=zAGu2TPt_78', {})

const menuState = useMenuState()
</script>

<template>
  <div>
    About Page

    <pre>
      {{ videoEmbed }}
    </pre>

    <button @click="menuState.opened = !menuState.opened">
      Close Menu
    </button>
  </div>
</template>
