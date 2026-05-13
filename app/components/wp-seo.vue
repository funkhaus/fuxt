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
const pageSeo = usePageSeo()

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
    imageUrl: {
        type: String,
        default: ''
    }
})

// WP excerpts and descriptions can contain HTML — strip it for meta tag content
function stripHtml(str?: string): string | undefined {
    return str?.replace(/<[^>]*>/g, '') || undefined
}

// Computeds — props → page state → site store defaults
const parsedTitle = computed(() => props.title || pageSeo.value?.title || siteStore.settings?.title || undefined)
const parsedDescription = computed(() => {
    const raw = props.description || pageSeo.value?.description || siteStore.settings?.description || undefined
    return stripHtml(raw)
})
const parsedImage = computed(() =>
    props.imageUrl
    || pageSeo.value?.imageUrl
    || siteStore.settings?.socialSharedImage?.src
    || siteStore.settings?.themeScreenshotUrl
    || undefined
)

// Set meta tags
useSeoMeta({
    title: () => parsedTitle.value,
    ogTitle: () => parsedTitle.value,
    twitterTitle: () => parsedTitle.value,
    description: () => parsedDescription.value,
    ogDescription: () => parsedDescription.value,
    twitterDescription: () => parsedDescription.value,
    ogImage: () => parsedImage.value,
    twitterImage: () => parsedImage.value,
    twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.wp-seo {
    display: none;
}
</style>
