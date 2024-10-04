export default defineNuxtPlugin(() => {
    const settingsStore = useSiteSettingsStore()

    // Get browser dimensions
    const { y } = useWindowScroll()
    const { width: newWinWidth, height: newWinHeight } = useWindowSize()
    const newBreakpoint = useCssVar('--breakpoint-name')

    // Update scroll direction
    watch(y, (newVal, oldVal = 0) => {
        settingsStore.sTop = newVal
        settingsStore.breakpoint = newBreakpoint?.value?.replace(/['"]+/g, '').trim() || 'desktop'

        if (oldVal > newVal || newVal === 0) {
            settingsStore.scrollDirection = 'up'
        }
        else {
            settingsStore.scrollDirection = 'down'
        }
    }, {
        immediate: true
    })

    // Update window dimensions
    watch([newWinWidth, newWinHeight], () => {
        settingsStore.winWidth = newWinWidth.value
        settingsStore.winHeight = newWinHeight.value
    }, {
        immediate: true
    })

    // Update store referrer. Useful to know where the user came from.
    addRouteMiddleware('referrer', async (to, from) => {
        if (from.name) {
            settingsStore.referrer = {
                name: from.name,
                fullPath: from.fullPath,
                path: from.path,
                query: from.query,
                params: from.params
            }
        }
    }, { global: true })
})
