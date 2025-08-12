<script lang="ts" setup>
import decodeHtmlEntities from './utils/decodeHtmlEntities'

const route = useRoute()
const siteStore = useSiteStore()

// Computed
const htmlClasses = computed(() => [
    'html',
    'route-' + route.name?.toString(),
    { 'menu-opened': siteStore.menuOpened }
])

// Methods
useHead(() => {
    return {
        titleTemplate(titleChunk) {
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
