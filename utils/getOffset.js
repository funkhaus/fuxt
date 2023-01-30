/*
 * Returns top and left offsets of an element relative to the document
 */
function getOffset(el) {
    const bodyRect = document.body.getBoundingClientRect()
    const elemRect = el.getBoundingClientRect()

    return {
        top: elemRect.top - bodyRect.top,
        left: elemRect.left - bodyRect.left
    }
}

export default getOffset
