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
const { data, error } = await useWpFetch(RequestType.POST, {
    query: {
        uri: parsedPath
    },
    pick: ['title', 'excerpt', 'content', 'featuredMedia'],
    onResponseError() {
        console.warn('<wp-seo> Fetch Error:', parsedPath.value)
    }
})

// On error, set data to empty object
if (error.value) {
    console.warn('<wp-seo> Error fetching data:', error.value)
}

// Computeds
const parsedTitle = computed(() => props.title || data.value?.title || siteStore.settings?.title || undefined)
const parsedDescription = computed(() => props.description || data.value?.excerpt || data.value?.content || siteStore.settings.description || undefined)
const parsedImage = computed(() => props.imageUrl || data.value?.featuredMedia?.src || siteStore.settings?.themeScreenshotUrl || undefined)

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
