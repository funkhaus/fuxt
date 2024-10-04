export default defineNuxtPlugin(() => {
    const settingsStore = useSiteSettingsStore()
    const { scrollDirection, winWidth, winHeight, sTop, breakpoint, referrer } = storeToRefs(settingsStore)

    // Get browser dimensions
    const { y } = useWindowScroll()
    const { width: newWinWidth, height: newWinHeight } = useWindowSize()
    const newBreakpoint = useCssVar('--breakpoint-name')

    // Update scroll direction
    watch(y, (newVal, oldVal = 0) => {
        sTop.value = newVal
        breakpoint.value = newBreakpoint.value?.replace(/['"]+/g, '').trim() || 'desktop'

        if (oldVal > newVal || newVal === 0) {
            scrollDirection.value = 'up'
        }
        else {
            scrollDirection.value = 'down'
        }
    }, {
        immediate: true
    })

    // Update window dimensions
    watch([newWinWidth, newWinHeight], () => {
        winWidth.value = newWinWidth.value
        winHeight.value = newWinHeight.value
    }, {
        immediate: true
    })

    // Update store referrer. Useful to know where the user came from.
    addRouteMiddleware('referrer', async (to, from) => {
        if (from.name) {
            referrer.value = {
                name: from.name,
                fullPath: from.fullPath,
                path: from.path,
                query: from.query,
                params: from.params
            }
        }
    }, { global: true })
})
