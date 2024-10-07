export default defineNuxtPlugin(async () => {
    const siteStore = useSiteStore()
    if (siteStore.hasLoaded) {
        return
    }

    // Popiulate the store with the settings from the WP API
    await useSiteStore().init()

    // Configure NuxtLink defaults
    defineNuxtLink({
        activeClass: 'active-link',
        exactActiveClass: 'exact-active-link',
        prefetch: true,
        trailingSlash: 'append',
        prefetchedClass: 'prefetched-link'
    })

    siteStore.hasLoaded = true
})
