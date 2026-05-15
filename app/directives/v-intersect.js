export default {
    mounted(el, binding) {
        const defaultSettings = {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 0.0,
            delay: 0,
            once: false,
            onEnterEvent: 'has-entered',
            onExitEvent: 'has-exited'
        }

        // Merge user settings with defaultss
        const settings = {
            ...defaultSettings,
            ...binding.value
        }

        const modifiers = {
            once: Boolean(binding.modifiers.once) || Boolean(settings.once),
            stagger: Boolean(binding.modifiers.stagger)
        }

        let observerStaggered = false

        const addClass = (className) => {
            el.classList.add(className)
        }

        const removeClass = (className) => {
            el.classList.remove(className)
        }

        const observer = new IntersectionObserver(
            ([{ isIntersecting }]) => {
                // Track when the element has intersected
                addClass('has-intersection-observer')

                if (isIntersecting) {
                    const applyEnter = () => {
                        addClass('has-entered')
                        removeClass('has-exited')

                        if (!observerStaggered && modifiers.stagger) {
                            el.style.transitionDelay = `${Math.random() * 0.5}s`
                            observerStaggered = true
                        }

                        if (binding.instance) {
                            const enterEvent = new CustomEvent(
                                settings.onEnterEvent || 'has-entered',
                                { detail: el }
                            )
                            el.dispatchEvent(enterEvent)
                        }

                        if (modifiers.once) {
                            observer.disconnect()
                        }
                    }

                    if (settings.delay > 0) {
                        const timeoutId = setTimeout(() => {
                            applyEnter()
                            delete el._intersectDelayTimeout
                        }, settings.delay)
                        el._intersectDelayTimeout = timeoutId
                    }
                    else {
                        applyEnter()
                    }
                }
                else {
                    if (el._intersectDelayTimeout) {
                        clearTimeout(el._intersectDelayTimeout)
                        delete el._intersectDelayTimeout
                    }

                    addClass('has-exited')
                    removeClass('has-entered')

                    if (binding.instance) {
                        const exitEvent = new CustomEvent(
                            settings.onExitEvent || 'has-exited',
                            {
                                detail: el
                            }
                        )
                        el.dispatchEvent(exitEvent) // Fire the exit event
                    }
                }
            },
            {
                root: settings.root,
                rootMargin: settings.rootMargin,
                threshold: settings.threshold
            }
        )

        observer.observe(el)

        // Cleanup observer
        el._stopObserver = () => observer.disconnect()
    },

    unmounted(el) {
        if (el._intersectDelayTimeout) {
            clearTimeout(el._intersectDelayTimeout)
            delete el._intersectDelayTimeout
        }
        if (el._stopObserver) {
            el._stopObserver()
            delete el._stopObserver
        }
    }
}
