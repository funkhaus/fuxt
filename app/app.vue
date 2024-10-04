<script lang="ts" setup>
const route = useRoute()
const settingsStore = useSiteSettingsStore()

// Computed
const htmlClasses = computed(() => [
    'html',
    'route-' + route.name?.toString(),
    { 'menu-opened': settingsStore.menuOpened }
])

// Methods
useHead(() => {
    return {
        titleTemplate: '%s'
    }
})
</script>

<template>
    <Html :class="htmlClasses" />

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>

</style>
