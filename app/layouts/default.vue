<script setup lang="ts">

</script>

<template>
  <div>
    <header>
      <slot name="title" />

      <NuxtLink to="/blog">
        Blog
      </NuxtLink>

      <WpMenu
        name="Main Menu"
        title="Menu"
      />

      <div>
        Breakcrumbs:
        <slot name="breadcrumbs">
          <Breadcrumbs :links="['A', 'B']" />
        </slot>
      </div>
    </header>

    <slot />
  </div>
</template>
