<template>
    <section class="page-home">
        <wp-menu
            name="Main Menu"
        />

        <!-- This is an examples component, delete it before development -->
        <component-examples />

        <wp-image
            v-for="(item, index) in items"
            :key="index"
            :image="item"
        />
    </section>
</template>

<script setup lang="ts">
// Helpers
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

// Computeds
const items = computed(() => {
    return workData?.value?.children?.map(item => item?.featuredMedia) || []
})
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
