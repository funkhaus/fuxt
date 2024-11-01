export default defineNuxtPlugin(() => {
    const siteStore = useSiteStore()

    // Get browser dimensions
    const { y } = useWindowScroll()
    const { width: newWinWidth, height: newWinHeight } = useWindowSize()
    const newBreakpoint = useCssVar('--breakpoint-name')

    // Update scroll direction
    watch(y, (newVal, oldVal = 0) => {
        siteStore.sTop = newVal
        siteStore.breakpoint = newBreakpoint?.value?.replace(/['"]+/g, '').trim() || 'desktop'

        if (oldVal > newVal || newVal === 0) {
            siteStore.scrollDirection = 'up'
        }
        else {
            siteStore.scrollDirection = 'down'
        }
    }, {
        immediate: true
    })

    // Update window dimensions
    watch([newWinWidth, newWinHeight], () => {
        siteStore.winWidth = newWinWidth.value
        siteStore.winHeight = newWinHeight.value
    }, {
        immediate: true
    })

    // Update store referrer. Useful to know where the user came from.
    addRouteMiddleware('referrer', async (to, from) => {
        if (from.name) {
            siteStore.referrer = {
                name: from.name,
                fullPath: from.fullPath,
                path: from.path,
                query: from.query,
                params: from.params
            }
        }
    }, { global: true })
})
