interface SwipeData {
    startX: number
    startY: number
    endX: number
    endY: number
}

/**
 * Detect swipe events on the element provided. See the readme for more info.
 * Used by the slideshow component
 */
function initSwipeEvents(el: HTMLElement, deltaMin: number = 50): void {
    const swipeData: SwipeData = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    }

    let directionEvents: string[] = []
    let isMouseDown = false

    const handleEnd = () => {
        const deltaX = swipeData.endX - swipeData.startX
        const deltaY = swipeData.endY - swipeData.startY

        if (Math.abs(deltaX) > deltaMin) {
            if (deltaX > 0) directionEvents.push('right')
            else directionEvents.push('left')
        }
        if (Math.abs(deltaY) > deltaMin) {
            if (deltaY > 0) directionEvents.push('down')
            else directionEvents.push('up')
        }

        directionEvents.forEach(direction =>
            el.dispatchEvent(new Event(`swipe-${direction}`))
        )

        directionEvents = []
    }

    // --- TOUCH EVENTS (mobile / tablet) ---
    el.addEventListener('touchstart', (e: TouchEvent) => {
        const t = e.touches[0]
        if (!t) return

        swipeData.startX = t.screenX
        swipeData.startY = t.screenY
    })

    el.addEventListener('touchend', (e: TouchEvent) => {
        const t = e.changedTouches[0]
        if (!t) return

        swipeData.endX = t.screenX
        swipeData.endY = t.screenY

        handleEnd()
    })

    // --- MOUSE EVENTS (desktop) ---
    el.addEventListener('mousedown', (e: MouseEvent) => {
        // only left click
        if (e.button !== 0) return

        isMouseDown = true
        swipeData.startX = e.screenX
        swipeData.startY = e.screenY
    })

    el.addEventListener('mouseup', (e: MouseEvent) => {
        if (!isMouseDown) return
        isMouseDown = false

        swipeData.endX = e.screenX
        swipeData.endY = e.screenY

        handleEnd()
    })

    // safety, if the mouse leaves the element with the mouse pressed
    el.addEventListener('mouseleave', () => {
        isMouseDown = false
    })
}

export default initSwipeEvents
