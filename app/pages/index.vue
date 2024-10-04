<template>
    <section class="page-home">
        Home page here

        <button @click="toggleMenu()">
            Toggle menu
        </button>

        <nuxt-link to="/about">
            About page
        </nuxt-link>
    </section>
</template>

<script setup lang="ts">
const settingsStore = useSiteSettingsStore()

// Data

// Computeds

// Methods
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
