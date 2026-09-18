<template>
    <!-- Renders <head> tags only; page templates own the <h1>. The slot keeps the component renderless. -->
    <slot />
</template>

<script setup lang="ts">
import type { WpSeo } from '~/types'

// Props
const props = defineProps<{
    title?: string
    description?: string
    imageUrl?: string
    // Yoast head data. Defaults to what useWpFetch published for the current route.
    seo?: WpSeo | null
}>()

// Helpers
const route = useRoute()
const siteStore = useSiteStore()
const pageSeo = usePageSeo()

// Yoast text fields arrive HTML-encoded (&#8217;, &quot;, &amp;). unhead escapes head content itself,
// so decode first or entities render literally in the title and meta tags.
const SEO_TEXT_FIELDS = ['title', 'description', 'ogTitle', 'ogDescription', 'ogSiteName', 'twitterTitle', 'twitterDescription', 'author'] as const

function decodeTextFields(seo: WpSeo): WpSeo {
    const decoded: WpSeo = { ...seo }
    for (const key of SEO_TEXT_FIELDS) {
        const value = decoded[key]
        if (typeof value === 'string') {
            decoded[key] = decodeHtmlEntities(value)
        }
    }
    return decoded
}

// WP excerpts and descriptions can contain HTML — strip it for meta tag content
function stripHtml(str?: string): string | undefined {
    return str?.replace(/<[^>]*>/g, '') || undefined
}

// Computeds
// Only trust page state that describes the current route, so a client nav to a route
// with no WP entity (search, archives) doesn't keep the previous page's SEO.
const routeSeo = computed(() => (pageSeo.value?.path && normalizePath(pageSeo.value.path) === normalizePath(route.path) ? pageSeo.value : {}))
const yoast = computed<WpSeo>(() => decodeTextFields(props.seo || routeSeo.value.seo || {}))
const hasYoastTitle = computed(() => Boolean(yoast.value.title))

// Source order per field: prop → Yoast → page state (WP title, excerpt, featured image) → site settings
const pageTitle = computed(() => props.title || yoast.value.title || routeSeo.value.title || siteStore.settings?.title || undefined)
const parsedDescription = computed(() => {
    const raw = props.description || yoast.value.description || yoast.value.ogDescription || routeSeo.value.description || siteStore.settings?.description || undefined
    return stripHtml(raw)
})
const yoastImage = computed(() => yoast.value.ogImage?.[0])
const parsedImage = computed(() =>
    props.imageUrl
    || yoastImage.value?.url
    || routeSeo.value.imageUrl
    || siteStore.settings?.socialSharedImage?.src
    || siteStore.settings?.themeScreenshotUrl
    || undefined
)
// Image dimensions are only known for Yoast's own image
const isYoastImage = computed(() => Boolean(yoastImage.value?.url) && parsedImage.value === yoastImage.value?.url)
const robots = computed(() => {
    const directives = Object.values(yoast.value.robots || {}).filter(Boolean)
    return directives.length ? directives.join(', ') : undefined
})
const frontendUrl = computed(() => String(siteStore.settings?.frontendUrl || '').replace(/\/+$/, ''))
// Self-referencing canonical when Yoast has none, so paginated or entity-less routes never read as duplicates
const canonical = computed(() => yoast.value.canonical || (frontendUrl.value ? `${frontendUrl.value}${route.path}` : undefined))

// Set meta tags
useSeoMeta({
    title: () => pageTitle.value,
    description: () => parsedDescription.value,
    robots: () => robots.value,
    author: () => yoast.value.author,
    ogLocale: () => yoast.value.ogLocale,
    ogType: () => yoast.value.ogType || 'website',
    ogTitle: () => yoast.value.ogTitle || pageTitle.value,
    ogDescription: () => yoast.value.ogDescription || parsedDescription.value,
    ogUrl: () => yoast.value.ogUrl || canonical.value,
    ogSiteName: () => yoast.value.ogSiteName || siteStore.settings?.title,
    ogImage: () => parsedImage.value,
    ogImageWidth: () => (isYoastImage.value ? yoastImage.value?.width : undefined),
    ogImageHeight: () => (isYoastImage.value ? yoastImage.value?.height : undefined),
    ogImageType: () => (isYoastImage.value ? yoastImage.value?.type : undefined),
    ogImageAlt: () => (isYoastImage.value ? yoastImage.value?.alt : undefined),
    articlePublishedTime: () => yoast.value.articlePublishedTime,
    articleModifiedTime: () => yoast.value.articleModifiedTime,
    twitterCard: () => yoast.value.twitterCard || 'summary_large_image',
    twitterTitle: () => yoast.value.twitterTitle || yoast.value.ogTitle || pageTitle.value,
    twitterDescription: () => yoast.value.twitterDescription || yoast.value.ogDescription || parsedDescription.value,
    twitterImage: () => yoast.value.twitterImage || parsedImage.value,
    twitterSite: () => yoast.value.twitterSite,
    twitterCreator: () => yoast.value.twitterCreator
})

// Canonical link, Yoast JSON-LD schema, and title template
useHead(() => ({
    // Yoast titles already include the site name, so bypass app.vue's titleTemplate when one is present
    ...(hasYoastTitle.value ? { titleTemplate: '%s' } : {}),
    link: canonical.value ? [{ rel: 'canonical', href: canonical.value }] : [],
    script: yoast.value.schema
        ? [{ key: 'yoast-schema', type: 'application/ld+json', innerHTML: JSON.stringify(yoast.value.schema) }]
        : []
}))
</script>
