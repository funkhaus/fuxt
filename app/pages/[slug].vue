<template>
    <section class="page-fallback">
        Fallback page here

        <!-- <h2 v-text="data.title" /> -->
    </section>
</template>

<script setup lang="ts">
const route = useRoute()

// Fetch data from WP
const { data } = await useWpFetch(`/post`, {
    query: {
        uri: route.path
    }
})
</script>

<style scoped>
.page-fallback {
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
