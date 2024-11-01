<template>
    <section class="page-home">
        About page
        <br>
        <nuxt-link to="/">
            Home
        </nuxt-link>
        <br>
        <nuxt-link to="/directors">
            Directors
        </nuxt-link>
    </section>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

const toggleMenu = () => {
    siteStore.menuOpened = !siteStore.menuOpened
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
