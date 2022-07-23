/*
 * Get the scroll percentage of the root element. If no root provided, will fallback to document/window.
 * Useful to build a "20% scrolled through this article" progress bar.
 */
const getPercentScrolled = (root) => {
    // We try for the provided element, fallback to window data
    const viewHeight = root.clientHeight || window.innerHeight
    const scrollTop = root.scrollTop || window.pageYOffset

    // Get the height of the provided root element, or fallback to docuument height
    const elHeight = Math.max(
        root.scrollHeight || 0,
        root.offsetHeight || 0,
        root.clientHeight || 0
    )
    const docHeight = Math.max(
        root?.documentElement?.scrollHeight || 0,
        root?.documentElement?.offsetHeight || 0,
        root?.documentElement?.clientHeight || 0
    )
    const rootHeight = elHeight || docHeight

    return (scrollTop / (rootHeight - viewHeight)) * 100
}

export default getPercentScrolled
