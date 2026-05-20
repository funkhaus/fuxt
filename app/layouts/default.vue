<template>
    <main :class="classes">
        <wp-seo />

        <cursor-follow />

        <global-header />

        <global-panel-menu
            :is-opened="siteStore.menuOpened"
            @close-menu="toggleMenu()"
        />

        <slot />

        <!-- TODO: <client-only><wp-controls /> -->
    </main>
</template>

<script setup lang="ts">
// Helpers
const siteStore = useSiteStore()

// Computeds
const classes = computed(() => ['default-layout'])

// Methods
const toggleMenu = () => {
    siteStore.menuOpened = !siteStore.menuOpened
}
</script>

<style>
.default-layout {
    min-height: var(--unit-100vh);
}
</style>
