<template>
    <header class="global-header">
        <global-logo class="logo" />

        <global-hamburger
            :menu-opened="siteStore.menuOpened"
            @toggle-menu="toggleMenu()"
        />
    </header>
</template>

<script setup lang="ts">
// Helpers
const siteStore = useSiteStore()

// Methods
const toggleMenu = () => {
    siteStore.menuOpened = !siteStore.menuOpened
}
</script>

<style scoped>
.global-header {
    height: var(--unit-header-height);
    padding: 20px;
    box-sizing: border-box;
    background-color: lightgray;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        width: 200px;
    }
}
</style>
