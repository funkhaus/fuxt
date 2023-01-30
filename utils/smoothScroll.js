/*
 * Smooth scroll to a desired pixel, returns a promise on fail or success.
 */
var intervalTimer = null
function smoothScroll({ top, left, behavior, selector }) {
    // TODO use getCLientBoundingRect to get pixel value for selector

    window.scrollTo({
        top,
        left,
        behavior
    })

    const scrollPromise = new Promise((resolve, reject) => {
        // Check scroll position, and success when window matches desired value
        clearInterval(intervalTimer)
        intervalTimer = setInterval(() => {
            if (window.scrollY == top) {
                clearInterval(intervalTimer)
                resolve("completed")
            }
        }, 100)

        // Clear timer in case scroll never completes
        setTimeout(() => {
            clearInterval(intervalTimer)
            reject("failed")
        }, 2000)
    })

    return scrollPromise
}
export default smoothScroll
