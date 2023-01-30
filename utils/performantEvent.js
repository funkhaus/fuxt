/*
 * This will take any event and emit a "performant-{eventName}" event based on requestAnimationFrame
 * Use like: performantEvent("scroll").add() and performantEvent("scroll").remove()
 * Designed for scroll and resize events, but works with any.
 * Payload for scroll and event contain window and scroll data in event.detail
 */
function performantEvent(type, obj = window) {
    let running = false

    const runCallback = () => {
        let detail = {}

        // Add some useful data to event
        switch (type) {
            case "scroll":
                detail = {
                    scrollTop: obj.pageYOffset || 0
                }
                break
            case "resize":
                detail = {
                    winWidth: obj.innerWidth,
                    winHeight: obj.innerHeight
                }
                break
        }

        obj.dispatchEvent(new CustomEvent(`performant-${type}`, { detail }))
        running = false
    }

    const execute = () => {
        if (running) {
            return
        }
        running = true

        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(runCallback)
        } else {
            setTimeout(runCallback, 66)
        }
    }

    return {
        add: function () {
            obj.addEventListener(type, execute)
        },
        remove: function () {
            obj.removeEventListener(type, execute)
        }
    }
}

export default performantEvent
