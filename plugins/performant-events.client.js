import performantEvent from "~/utils/performantEvent"
import _get from "lodash/get"

let hasLoaded = false

// Event callbacks to handle updating the store from a browser event
function onScroll({ store }, event = {}) {
    // Save window scroll position to store
    const sTop = _get(event, "detail.scrollTop", window.pageYOffset)
    store.commit("SET_S_TOP", sTop)
}
function onResize({ store }, event = {}) {
    const dimensions = {
        height: _get(event, "detail.winHeight", window.innerHeight),
        width: _get(event, "detail.winWidth", window.innerWidth),
    }
    store.commit("SET_WIN_DIMENSIONS", dimensions)
}
function onKeydown({ store }, event) {
    switch (event && event.key) {
        case "Escape":
            // Close menu on ESC press
            store.commit("SET_MENU", false)
            break
    }
}

export default (context, inject) => {
    let touchDown = false
    let touchTimerId = null

    // Avoid this running twice
    if (hasLoaded) {
        return
    }

    // Setup new performant events
    performantEvent("scroll").add()
    performantEvent("resize").add()

    // Don't do anything else if store doesn't exist (like in Storybook)
    if (!context.store) {
        return
    }

    // We use this to ignore setting winHeight/winWidth on Safari pulldown-to-refresh gesture
    window.addEventListener("touchstart", (event) => {
        clearTimeout(touchTimerId)
        touchDown = true
    })
    window.addEventListener("touchend", (event) => {
        clearTimeout(touchTimerId)
        touchTimerId = setTimeout(() => {
            touchDown = false
        }, 1000)
    })

    // Bind to new events
    window.addEventListener("performant-scroll", (event) => {
        onScroll(context, event)
    })
    window.addEventListener("performant-resize", (event) => {
        // Abort if touch is down (eg: when doing a pull-down refresh)
        if (touchDown) {
            return
        }
        onResize(context, event)
    })
    window.addEventListener("keydown", (event) => {
        onKeydown(context, event)
    })
    window.addEventListener("deviceorientation", (event) => {
        onResize(context)
    })
    window.addEventListener("orientationchange", (event) => {
        onResize(context)
    })

    // Kick off events to populate store with intial values
    onScroll(context)
    onResize(context)

    hasLoaded = true
}
