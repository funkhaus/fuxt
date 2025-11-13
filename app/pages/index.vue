<template>
    <section class="page-home">
        Home page here

        <wp-menu
            name="Main Menu"
        />

        <global-hamburger
            :menu-opened="siteStore.menuOpened"
            @toggle-menu="toggleMenu()"
        />

        <wp-image
            v-for="(item, index) in items"
            :key="index"
            :image="item"
        />
    </section>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

// Fetch data from WP
const { data: workData } = await useWpFetch(RequestType.POST, {
    query: {
        uri: '/work',
        fields: 'acf, children'
    }
})

// Computed properties
const items = computed(() => {
    return workData?.value?.children?.map(item => item?.featuredMedia) || []
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
