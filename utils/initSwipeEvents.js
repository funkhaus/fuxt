/*
 * Detect swipe events on the element provided. See the readme for more info.
 * Used by the slideshow component
 */
function initSwipeEvents(el, deltaMin = 80) {
    const swipeData = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    }
    let directionEvents = []
    el.addEventListener("touchstart", (e) => {
        const t = e.touches[0]
        swipeData.startX = t.screenX
        swipeData.startY = t.screenY
    })
    el.addEventListener("touchmove", (e) => {
        const t = e.touches[0]
        swipeData.endX = t.screenX
        swipeData.endY = t.screenY
    })
    el.addEventListener("touchend", () => {
        const deltaX = swipeData.endX - swipeData.startX
        const deltaY = swipeData.endY - swipeData.startY

        if (Math.abs(deltaX) > deltaMin) {
            if (deltaX > 0) directionEvents.push("right")
            else directionEvents.push("left")
        }
        if (Math.abs(deltaY) > deltaMin) {
            if (deltaY > 0) directionEvents.push("down")
            else directionEvents.push("up")
        }

        directionEvents.forEach((direction) =>
            el.dispatchEvent(new Event(`swipe-${direction}`))
        )

        directionEvents = []
    })
}

export default initSwipeEvents
