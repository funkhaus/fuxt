<template>
    <section class="page-home">
        Home page here
        <wp-image
            v-for="(item, index) in logos"
            :key="index"
            :image="item"
        />
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
const logoReq = useWpFetch(`/post`, {
    query: {
        name: 'Logo'
    }
})
const menuReq = useWpFetch(`/menus`, {
    query: {
        name: 'Main Menu'
    }
})
const workReq = useWpFetch(`/post`, {
    query: {
        uri: '/work',
        fields: 'acf, children'
    }
})

const [{ data: workData }, { data: menuData }, { data: logoData }] = await Promise.all([workReq, menuReq, logoReq])

// Computed properties
const items = computed(() => {
    return workData?.value?.children?.map(item => item?.featuredMedia || {}) || []
})
const menuItems = computed(() => {
    return menuData?.value || []
})
const logos = computed(() => {
    return logoData?.value || {}
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
