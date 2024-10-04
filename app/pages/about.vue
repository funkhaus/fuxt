<template>
    <section class="page-home">
        About page
    </section>
</template>

<script setup lang="ts">
const settingsStore = useSiteSettingsStore()

const toggleMenu = () => {
    settingsStore.menuOpened = !settingsStore.menuOpened
}
</script>

<style scoped>
.page-home {
    min-height: 200vh;

    color: var(--color-black);
    /* margin: 0 auto; */
    /* min-height: var(--unit-100vh); */

    /* Hover states */
    /* @media #{$has-hover} {
         Hover styles would go here
    } */

    /* Breakpoints */
    @media (--lt-phone) {
        background-color: blue;
    }
}
</style>
