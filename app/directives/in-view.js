import { useIntersectionObserver } from '@vueuse/core'
import _clamp from 'lodash/clamp'

// Throttle function
const rafThrottle = (fn) => {
    let ticking = false

    return function () {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                fn.apply(this, arguments)
                ticking = false
            })
            ticking = true
        }
    }
}

// Utility function to clamp values
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const createInViewState = (el, settings) => {
    let scrollHandler = null
    let resizeHandler = null

    const updatePosition = () => {
        const viewHeight = window.innerHeight || document.documentElement.clientHeight
        const scrollTop = document.body.scrollTop || window.pageYOffset
        const rect = el.getBoundingClientRect()
        const data = { rect, viewHeight, scrollTop }

        const progress = {
            percentVisible: getPercentVisible(data),
            percentCenter: getPercentCenter(data),
            percentTop: getPercentTop(data),
            percentFromCenter: getPercentFromCenter(data),
            percentScrolled: getPercentScrolled(data),
            percentToCenter: getPercentToCenter(data)
        }

        const detail = {
            ...data,
            ...progress,
            flags: getFlags({ ...data, ...progress })
        }

        // Dispatch progress event
        el.dispatchEvent(new CustomEvent('progress', { detail: Object.freeze(detail) }))

        // Set classes and CSS variables if enabled
        setClasses(detail)
        if (settings.cssVars) {
            setCssVars(detail)
        }
    }

    const startTracking = () => {
        scrollHandler = rafThrottle(updatePosition)
        resizeHandler = rafThrottle(updatePosition)
        document.addEventListener('scroll', scrollHandler, { passive: true })
        window.addEventListener('resize', resizeHandler, { passive: true })
    }

    const stopTracking = () => {
        document.removeEventListener('scroll', scrollHandler)
        window.removeEventListener('resize', resizeHandler)
        scrollHandler = null
        resizeHandler = null
    }

    const getPercentVisible = ({ rect, viewHeight }) => {
        rect.fromTop = clamp(rect.top, 0, viewHeight)
        rect.fromBottom = clamp(viewHeight - rect.bottom, 0, viewHeight)
        return (viewHeight - rect.fromTop - rect.fromBottom) / rect.height || 0
    }

    const getPercentToCenter = ({ rect, viewHeight }) => {
        const viewHeightCenter = viewHeight / 2
        const rectTop = rect.top
        const amount = Math.abs(viewHeightCenter / rectTop)
        return _clamp(amount, 0, 1)
    }

    const getPercentCenter = ({ rect, viewHeight }) => {
        const rectCenter = rect.top + rect.height / 2
        return clamp(1 - rectCenter / viewHeight, 0, 1)
    }

    const getPercentTop = ({ rect, viewHeight }) => clamp(rect.top / viewHeight, 0, 1)

    const getPercentFromCenter = ({ rect, viewHeight }) => {
        const viewHeightCenter = viewHeight / 2
        const rectCenter = rect.top + rect.height / 2
        const amount = (viewHeightCenter - rectCenter) / viewHeightCenter
        return clamp(amount, -1, 1)
    }

    const getPercentScrolled = ({ rect, viewHeight }) => {
        const top = viewHeight - rect.top
        const amount = rect.height + viewHeight
        return clamp(top / amount, 0, 1)
    }

    const getFlags = ({ percentVisible, rect, scrollTop }) => {
        const inView = percentVisible > 0

        return {
            inView,
            isAbove: rect.top < 0 && !inView,
            isBelow: rect.top > 0 && !inView,
            isThird: percentVisible >= 0.33,
            isHalf: percentVisible >= 0.5,
            isFull: percentVisible === 1
        }
    }

    const setClasses = ({ flags }) => {
        el.classList.toggle('view-in', flags.inView)
        el.classList.toggle('view-out', !flags.inView)
        el.classList.toggle('view-in-third', flags.isThird)
        el.classList.toggle('view-in-half', flags.isHalf)
        el.classList.toggle('view-in-full', flags.isFull)
    }

    const setCssVars = (details) => {
        el.style.setProperty('--view-percent-visible', details.percentVisible)
        el.style.setProperty('--view-percent-center', details.percentCenter)
        el.style.setProperty('--view-percent-top', details.percentTop)
    }

    // Return an object with public methods and properties
    return {
        updatePosition,
        startTracking,
        stopTracking
    }
}

export default {
    mounted(el, binding) {
        const settings = {
            root: null,
            rootMargin: '0px',
            threshold: 0.0,
            cssVars: true,
            ...binding.value
        }

        // Create a new instance of InViewState
        const inViewState = createInViewState(el, settings)

        // Init Intersection Observer
        const { stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                if (isIntersecting) {
                    inViewState.startTracking()
                    el.dispatchEvent(new CustomEvent('has-entered'))
                }
                else {
                    inViewState.stopTracking()
                    el.dispatchEvent(new CustomEvent('has-exited'))
                }
            },
            {
                root: settings.root,
                rootMargin: settings.rootMargin,
                threshold: settings.threshold
            }
        )

        // Attach the stop function to the element for cleanup
        el._stopObserver = stop
        el._inViewState = inViewState // Keep reference to the InViewState

        // Listen for progress events to dispatch custom events
        el.addEventListener('progress', (event) => {
            const { flags } = event.detail
            if (flags.isThird) {
                el.dispatchEvent(new CustomEvent('has-enter-third'))
            }
            if (flags.isHalf) {
                el.dispatchEvent(new CustomEvent('has-enter-half'))
            }
        })
    },
    unmounted(el) {
        if (el._stopObserver) {
            el._stopObserver()
            delete el._stopObserver
        }
        if (el._inViewState) {
            el._inViewState.stopTracking()
            delete el._inViewState
        }
    }
}
