<template>
    <div class="wp-seo">
        <!-- Print content to page for SEO gain -->
        <h1
            v-if="parsedTitle"
            v-html="parsedTitle"
        />
        <!-- <div
            v-if="parsedDescription"
            v-html="parsedDescription"
        /> -->
    </div>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()
const route = useRoute()

// Props
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    path: {
        type: String,
        default: ''
    }
})

// Fetch data from WP
const parsedPath = computed<string>(() => props.path || route.path || '')

// Fetch data from WP
const { data } = await useWpFetch(`/post`, {
    query: {
        uri: parsedPath
    },
    pick: ['title'],
    onResponseError({ error }) {
        console.warn('<wp-seo> Fetch Error:', parsedPath, error)
        data.value = {}
    }
})

// Computeds
const parsedTitle = computed<string>(() => props.title || data.value?.title || siteStore.settings?.title || undefined)

useSeoMeta({
    title: () => parsedTitle.value
    // ogTitle: 'My Amazing Site',
    // description: 'This is my amazing site, let me tell you all about it.',
    // ogDescription: 'This is my amazing site, let me tell you all about it.',
    // ogImage: 'https://example.com/image.png',
    // twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.wp-seo {
    display: none;
}
</style>
