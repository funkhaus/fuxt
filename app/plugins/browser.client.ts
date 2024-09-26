export default defineNuxtPlugin(() => {
    const settingsStore = useSiteSettingsStore()
    const { scrollDirection, winWidth, winHeight, sTop, breakpoint } = storeToRefs(settingsStore)

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
})
