import performantEvent from "~/utils/performantEvent"

let hasLoaded = false
let oldScroll = 0

// Event callbacks to handle updating the store from a browser event
function onScroll({ store }, event = {}) {
    // Save window scroll position to store
    const sTop = (event?.detail?.scrollTop, window.pageYOffset)

    if (oldScroll > sTop || sTop === 0) {
        store.commit("SET_SCROLL_DIRECTION", "up")
    } else {
        store.commit("SET_SCROLL_DIRECTION", "down")
    }
    oldScroll = sTop

    store.commit("SET_S_TOP", sTop)
}
function onResize({ store }, event = {}) {
    const dimensions = {
        height: (event?.detail?.winHeight, window.innerHeight),
        width: (event?.detail?.winWidth, window.innerWidth)
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

    // Bind to new events
    window.addEventListener("performant-scroll", (event) => {
        onScroll(context, event)
    })
    window.addEventListener("performant-resize", (event) => {
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

    // New way to handle screen orientation change, will replace "orientationchange" eventually
    if (screen && screen.orientation) {
        screen.orientation.addEventListener("change", (event) => {
            onResize(context)
        })
    }

    // Kick off events to populate store with intial values
    onScroll(context)
    onResize(context)

    hasLoaded = true
}
