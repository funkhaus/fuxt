<template>
    <div class="wp-seo">
        <!-- Print content to page for SEO gain -->
        <h1
            v-if="parsedTitle"
            v-html="parsedTitle"
        />
        <div
            v-if="parsedDescription"
            v-html="parsedDescription"
        />
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
    },
    imageUrl: {
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
    pick: ['title', 'excerpt', 'content', 'featuredMedia'],
    onResponseError({ error }) {
        console.warn('<wp-seo> Fetch Error:', parsedPath, error)
        data.value = {}
    }
})

// Computeds
const parsedTitle = computed<string>(() => props.title || data.value?.title || siteStore.settings?.title || undefined)
const parsedDescription = computed<string>(() => props.description || data.value?.excerpt || data.value?.content || siteStore.settings.description || undefined)
const parsedImage = computed<string>(() => props.imageUrl || data.value?.featuredMedia?.src || siteStore.settings.themeScreenshotUrl || undefined)

// Set meta tags
useSeoMeta({
    title: () => parsedTitle.value,
    ogTitle: () => parsedTitle.value,
    description: () => parsedDescription.value,
    ogDescription: () => parsedDescription.value,
    ogImage: () => parsedImage.value
})
</script>

<style scoped>
.wp-seo {
    display: none;
}
</style>
