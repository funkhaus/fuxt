export const useSiteStore = defineStore('site', () => {
    const settings = ref({})
    const menuOpened = ref(false)
    const breakpoint = ref('desktop')
    const referrer: Ref<boolean | object> = ref(false)
    const scrollDirection = ref('up')
    const sTop = ref(0)
    const winHeight = ref(0)
    const winWidth = ref(0)
    const hasLoaded = ref(false)

    // Setup default store settings values
    settings.value = {
        title: '',
        description: '',
        backendUrl: '',
        frontendUrl: '',
        themeScreenshotUrl: '',
        sociaMedia: [],
        googleAnalytics: [],
        socialSharedImage: {}
    }

    // Populate state from WP API
    const init = async () => {
        // Do requests in parallel
        const settingsReq = useWpFetch('/settings')
        const acfReq = useWpFetch('/acf-options?name=Site Options')
        const [settingsRes, acfRes] = await Promise.all([settingsReq, acfReq])

        // Get ref values
        const settingsData = settingsRes.data?.value || {}
        const acfData = acfRes.data?.value || {}

        // Save to store
        settings.value = { ...settingsData, ...acfData }
    }

    return {
        settings,
        menuOpened,
        breakpoint,
        sTop,
        winHeight,
        winWidth,
        referrer,
        scrollDirection,
        hasLoaded,
        init
    }
})
