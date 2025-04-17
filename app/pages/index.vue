<template>
    <section class="page-home">
        Home page here

        <global-hamburger
            :menu-opened="siteStore.menuOpened"
            @toggle-menu="toggleMenu()"
        />

        <div
            v-if="data?.content"
            v-html="data?.content"
        />
    </section>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

// Fetch data from WP
const { data } = await useWpFetch(`/post`, {
    query: {
        uri: '/'
    }
})

// Methods
const toggleMenu = () => {
    siteStore.menuOpened = !siteStore.menuOpened
}
</script>

<style scoped>
.page-home {
    min-height: var(--unit-100vh);

    /* Hover */
    @media (--has-hover) {
    }
    /* Breakpoints */
    @media (--gt-cinema) {
    }
    @media (--lt-tablet) {
    }
    @media (--lt-phone) {
    }
}
</style>
