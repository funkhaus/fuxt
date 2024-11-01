<template>
    <section class="page-home">
        Home page here

        <button @click="toggleMenu()">
            Toggle menu
        </button>

        <br>

        <!-- <div v-html="data.content" /> -->

        <wp-image :image="data.featuredMedia" />
    </section>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

// Fetch data from WP
const { data } = await useWpFetch(`/post`, {
    query: {
        uri: '/'
    }
    // pick: ['title'],
    // onResponseError({ error }) {
    //     console.warn('<wp-seo> Fetch Error:', parsedPath, error)
    //     data.value = {}
    // }
})

// Methods
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
