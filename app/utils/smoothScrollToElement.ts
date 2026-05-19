/**
 * Custom window scroll to an element — calmer than native `scrollIntoView({ behavior: 'smooth' })`,
 * which is especially snappy in Safari.
 */
function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function getTargetScrollY(element: Element): number {
    const rect = element.getBoundingClientRect()
    const marginTop = parseFloat(getComputedStyle(element).scrollMarginTop) || 0
    const y = window.scrollY + rect.top - marginTop
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    return Math.min(maxY, Math.max(0, y))
}

export function smoothScrollToElement(element: Element): Promise<void> {
    if (typeof window === 'undefined') {
        return Promise.resolve()
    }

    const targetY = getTargetScrollY(element)
    const startY = window.scrollY
    const distance = Math.abs(targetY - startY)

    if (distance < 1) {
        return Promise.resolve()
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: targetY, left: window.scrollX })
        return Promise.resolve()
    }

    const durationMs = Math.min(1400, Math.max(520, 380 + distance * 0.22))
    const t0 = performance.now()

    return new Promise((resolve) => {
        function frame(now: number) {
            const elapsed = now - t0
            const t = Math.min(1, elapsed / durationMs)
            const eased = easeInOutCubic(t)
            const y = startY + (targetY - startY) * eased
            window.scrollTo({ top: y, left: window.scrollX })
            if (t < 1) {
                requestAnimationFrame(frame)
            }
            else {
                resolve()
            }
        }
        requestAnimationFrame(frame)
    })
}
