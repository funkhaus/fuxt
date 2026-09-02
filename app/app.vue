<script lang="ts" setup>
import decodeHtmlEntities from './utils/decodeHtmlEntities'

const route = useRoute()
const siteStore = useSiteStore()
// Set by the yoast plugin; when present the SEO title wins verbatim
const yoastTitle = useState<string>('yoast-title', () => '')

// Computed
const htmlClasses = computed(() => [
    'html',
    'route-' + route.name?.toString(),
    { 'menu-opened': siteStore.menuOpened },
    { 'is-scroll-locked': siteStore.menuOpened || siteStore.isScrollLocked }
])

// Methods
useHead(() => {
    return {
        titleTemplate(titleChunk) {
            // Yoast provides the complete SEO title (site name included)
            if (yoastTitle.value) {
                return decodeHtmlEntities(yoastTitle.value)
            }

            const title = decodeHtmlEntities(titleChunk)
            const siteTitle = decodeHtmlEntities(siteStore.settings?.title || '')

            let output = siteTitle

            switch (true) {
                case siteTitle == title:
                    output = siteTitle
                    break

                case Boolean(title):
                    output = `${siteTitle} - ${title}`
                    break
            }

            return output
        }
    }
})
</script>

<template>
    <Html :class="htmlClasses" />

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style></style>
