export default defineNuxtPlugin(async () => {
    const settingsStore = useSiteSettingsStore()
    if (settingsStore.hasLoaded) {
        return
    }

    // Popiulate the store with the settings from the WP API
    await useSiteSettingsStore().init()

    // Configure NuxtLink defaults
    defineNuxtLink({
        activeClass: 'active-link',
        exactActiveClass: 'exact-active-link',
        prefetch: true,
        trailingSlash: 'append',
        prefetchedClass: 'prefetched-link'
    })

    settingsStore.hasLoaded = true
})
