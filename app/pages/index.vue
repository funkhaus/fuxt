<template>
    <section class="page-home">
        Home page here
        <wp-image
            v-for="(item, index) in items"
            :key="index"
            :image="item"
        />

        <global-hamburger
            :menu-opened="siteStore.menuOpened"
            @toggle-menu="toggleMenu()"
        />

        <div
            v-html="data?.content"
        />
    </section>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

// Fetch data from WP
const pageReq = useWpFetch(`/post`, {
    query: {
        uri: '/'
    }
})
const workReq = useWpFetch(`/post`, {
    query: {
        uri: '/work',
        fields: 'acf, children'
    }
})

const [{ data: workData }, { data: pageData }] = await Promise.all([workReq, pageReq])

// Computed properties
const items = computed(() => {
    return workData?.value?.children?.map(item => item?.featuredMedia || {}) || []
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
