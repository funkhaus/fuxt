export const useSiteSettingsStore = defineStore('siteSettings', () => {
    const settings = ref({})
    const menuOpened = ref(false)
    const breakpoint = ref('desktop')
    const referrer = ref(false)
    const scrollDirection = ref('up')
    const sTop = ref(0)
    const winHeight = ref(0)
    const winWidth = ref(0)

    // Function to update the store
    const update = (newVal) => {
        console.log('Updating store', newVal)

        scrollDirection.value = newVal
    }

    // TODO Get some values from WP
    // const res = await useWpFetch('/settings')
    const res = {
        title: '',
        description: '',
        backendUrl: '',
        frontendUrl: '',
        themeScreenshotUrl: ''
    }
    const siteOptions = {
        socialMedia: [
            {
                platform: '',
                url: ''
            }
        ],
        googleAnalytics: ['123456', '78912345'],
        socialSharedImage: { id: 123456, sourceUrl: 'https://example.com/image.jpg' }

    }

    settings.value = { ...res, ...siteOptions }

    return {
        settings,
        menuOpened,
        breakpoint,
        sTop,
        winHeight,
        winWidth,
        referrer,
        scrollDirection,
        update
    }
})
