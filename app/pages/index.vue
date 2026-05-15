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

        <div
            data-cursor-text="Custom Text"
            class="block-red"
        >
            Block Example
        </div>

        <wp-image
            v-for="(item, index) in items"
            :key="index"
            :image="item"
        />
    </section>
</template>

<script setup lang="ts">
// Helpers
const siteStore = useSiteStore()
const route = useRoute()

// Fetch data from WP
const { data: workData } = await useWpFetch(RequestType.POST, {
    query: {
        uri: route.path,
        fields: 'acf, children'
    }
})

// Publish SEO data for wp-seo (no separate request needed)
usePageSeo().value = {
    title: workData.value?.title,
    description: workData.value?.excerpt,
    imageUrl: workData.value?.featuredMedia?.src
}

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
