<template>
    <div class="wp-seo">
        <h1
            v-if="parsedTitle"
        >
            {{ parsedTitle }}
        </h1>
        <div
            v-if="parsedDescription"
        >
            {{ parsedDescription }}
        </div>
    </div>
</template>

<script setup lang="ts">
import keysToCamelCase from '~/utils/keysToCamelCase'

interface WpSeoData {
    title?: string
    content?: string
    featuredMedia?: {
        src?: string
    }
}

interface SiteSettings {
    title?: string
    description?: string
    themeScreenshotUrl?: string
    frontendUrl?: string
}

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
    },
    fetchSeo: {
        type: Boolean,
        default: true
    }
})

const parsedPath = computed<string>(() => props.path || route.path || '')

// Use useAsyncData for SEO data - must run server-side
const { data: wpData } = useAsyncData(
    // Dynamic key based on path for proper caching
    () => `seo-${parsedPath.value}`,
    async () => {
        if (!props.fetchSeo) {
            return {} as WpSeoData
        }

        const baseURL = useRuntimeConfig().public.wordpressApiUrl
        const { enabled } = usePreviewMode()

        const response = await $fetch(`/post`, {
            baseURL,
            query: {
                uri: parsedPath.value
            },
            credentials: enabled.value ? 'include' : undefined,
            server: !enabled.value
        })

        const transformedData = keysToCamelCase(response || {}) as WpSeoData
        return transformedData
    },

    {
        // Run on server side for SEO
        server: true,
        default: () => ({} as WpSeoData)
    }
)

// Computeds
const parsedTitle = computed<string | undefined>(() =>
    props.title
    || wpData.value?.title
    || (siteStore.settings as SiteSettings)?.title
    || undefined
)

const parsedDescription = computed<string | undefined>(() =>
    props.description
    || wpData.value?.content
    || (siteStore.settings as SiteSettings)?.description
    || undefined
)

const parsedImage = computed<string | undefined>(() =>
    props.imageUrl
    || wpData.value?.featuredMedia?.src
    || (siteStore.settings as SiteSettings)?.themeScreenshotUrl
    || undefined
)

// Get site URL from store
const siteUrl = computed(() => {
    const settings = siteStore.settings as SiteSettings
    return settings?.frontendUrl || ''
})

// Set meta tags
useSeoMeta({
    title: () => parsedTitle.value,
    ogTitle: () => parsedTitle.value,
    description: () => parsedDescription.value,
    ogDescription: () => parsedDescription.value,
    ogImage: () => parsedImage.value,
    ogType: () => 'website',
    ogUrl: () => `${siteUrl.value}${route.path}`,
    twitterCard: () => 'summary_large_image',
    twitterTitle: () => parsedTitle.value,
    twitterDescription: () => parsedDescription.value,
    twitterImage: () => parsedImage.value,
    robots: () => 'index, follow'
})

// Set canonical URL
useHead(() => ({
    link: [
        {
            rel: 'canonical',
            href: `${siteUrl.value}${route.path}`
        }
    ]
}))
</script>

<style scoped>
.wp-seo {
    display: none;
}
</style>
