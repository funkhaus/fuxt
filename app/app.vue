<script lang="ts" setup>
const route = useRoute()

// Computed
const htmlClasses = computed(() => ['html', 'route-' + route.name?.toString()])

// Methods
useHead(() => {
    return {
        titleTemplate: '%s',
        htmlAttrs: {
            class: htmlClasses
        }
    }
})
defineNuxtLink({
    activeClass: 'active-link',
    exactActiveClass: 'exact-active-link',
    prefetch: true,
    trailingSlash: 'append',
    prefetchedClass: 'prefetched-link'
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
