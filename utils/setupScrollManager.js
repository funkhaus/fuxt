/*
 * Performant scroll events.
 * See: https://gist.github.com/tylerchilds/6ce0bb6e200b3cb797c843dc4ade425b
 */
function setupScrollManager() {
    let callbacks = []
    let scrollPosition = -1
    let animatedKilled = false

    const animate = () => {
        requestAnimationFrame(onScroll)
    }

    function onScroll() {
        if (animatedKilled) return

        if (scrollPosition !== window.pageYOffset) {
            window.removeEventListener("scroll", animate)
            scrollPosition = window.pageYOffset
            callbacks.forEach((cb) => cb(scrollPosition))
            animate()
        } else {
            window.addEventListener("scroll", animate)
        }
    }

    animate()

    return {
        add: function (cb) {
            callbacks = [...callbacks, cb]
        },
        remove: function (cb) {
            callbacks = callbacks.filter((value) => value != cb)
        },
        destroy: function () {
            animatedKilled = true
            window.removeEventListener("scroll", animate)
        },
    }
}

export default setupScrollManager
