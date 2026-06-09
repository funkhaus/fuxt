import type { Ref } from 'vue'

/**
 * Shared drag-to-scroll + momentum logic for horizontal scroll containers.
 * Used by gallery-horizontal-cursor-mobile and draggable-carousel.
 */
export type UseDragScrollMomentumOptions = {
    momentum?: boolean
    friction?: number
    minVelocity?: number
    clickThreshold?: number
    /** Called when drag or momentum ends (so consumer can sync e.g. scrollTargetIndex) */
    onSettle?: () => void
}

const DEFAULT_FRICTION = 0.92
const DEFAULT_MIN_VELOCITY = 0.5
const DEFAULT_CLICK_THRESHOLD = 10

export function useDragScrollMomentum(
    scrollRef: Ref<HTMLElement | null>,
    options: UseDragScrollMomentumOptions = {}
) {
    const {
        momentum = true,
        friction = DEFAULT_FRICTION,
        minVelocity = DEFAULT_MIN_VELOCITY,
        clickThreshold = DEFAULT_CLICK_THRESHOLD,
        onSettle
    } = options

    const isDragging = ref(false)
    const dragStartX = ref(0)
    const dragStartScrollLeft = ref(0)
    const dragDeltaX = ref(0)
    const lastMoveTime = ref(0)
    const lastScrollLeft = ref(0)
    const lastVelocity = ref(0)
    let momentumRafId: number | null = null

    const carouselClasses = computed(() => [
        'carousel',
        { 'cursor-grabbing': isDragging.value },
        { 'cursor-grab': !isDragging.value },
        { 'has-moved': Math.abs(dragDeltaX.value) > clickThreshold }
    ])

    function stopMomentum(): void {
        if (momentumRafId != null) {
            cancelAnimationFrame(momentumRafId)
            momentumRafId = null
        }
    }

    function startDrag(e: MouseEvent | TouchEvent): void {
        const el = scrollRef.value
        if (!el) return
        stopMomentum()

        isDragging.value = true
        dragDeltaX.value = 0
        const now = performance.now()
        lastMoveTime.value = now
        lastScrollLeft.value = el.scrollLeft
        lastVelocity.value = 0
        const pageX = 'touches' in e ? e.touches[0]?.pageX ?? 0 : (e as MouseEvent).pageX
        dragStartX.value = pageX
        dragStartScrollLeft.value = el.scrollLeft

        if ('touches' in e) {
            window.addEventListener('touchmove', drag, { passive: false })
            window.addEventListener('touchend', endDrag)
        }
        else {
            window.addEventListener('mousemove', drag)
            window.addEventListener('mouseup', endDrag)
        }
    }

    function drag(e: MouseEvent | TouchEvent): void {
        const el = scrollRef.value
        if (!isDragging.value || !el) return
        e.preventDefault()

        const now = performance.now()
        const dt = now - lastMoveTime.value
        if (dt > 0 && momentum) {
            const scrollDelta = el.scrollLeft - lastScrollLeft.value
            lastVelocity.value = scrollDelta / dt
        }
        lastMoveTime.value = now
        lastScrollLeft.value = el.scrollLeft

        const pageX = 'touches' in e ? e.touches[0]?.pageX ?? 0 : (e as MouseEvent).pageX
        const deltaX = pageX - dragStartX.value
        el.scrollLeft = dragStartScrollLeft.value - deltaX
        dragDeltaX.value = deltaX
    }

    function endDrag(): void {
        const el = scrollRef.value
        isDragging.value = false
        dragDeltaX.value = 0
        window.removeEventListener('mousemove', drag)
        window.removeEventListener('mouseup', endDrag)
        window.removeEventListener('touchmove', drag)
        window.removeEventListener('touchend', endDrag)

        if (momentum && el && Math.abs(lastVelocity.value) > minVelocity) {
            let velocity = lastVelocity.value
            let lastTickTime = performance.now()

            function tick(): void {
                if (!el) return
                const now = performance.now()
                const dt = now - lastTickTime
                lastTickTime = now
                const maxScroll = el.scrollWidth - el.clientWidth
                const nextScroll = el.scrollLeft + velocity * dt

                if (nextScroll <= 0 || nextScroll >= maxScroll) {
                    el.scrollLeft = Math.max(0, Math.min(maxScroll, nextScroll))
                    momentumRafId = null
                    onSettle?.()
                    return
                }
                el.scrollLeft = nextScroll
                velocity *= friction
                if (Math.abs(velocity) < minVelocity) {
                    momentumRafId = null
                    onSettle?.()
                    return
                }
                momentumRafId = requestAnimationFrame(tick)
            }
            momentumRafId = requestAnimationFrame(tick)
        }
        else {
            onSettle?.()
        }
    }

    onScopeDispose(() => {
        stopMomentum()
    })

    return {
        isDragging,
        dragDeltaX,
        carouselClasses,
        startDrag,
        stopMomentum
    }
}
