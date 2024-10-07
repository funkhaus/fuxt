<script lang="ts" setup>
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
            const title = titleChunk
            const siteTitle = siteStore.settings.title

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

<style>

</style>
