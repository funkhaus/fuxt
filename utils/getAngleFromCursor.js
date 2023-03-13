/*
 * Get the angle from the cursor to the providedelement
 * @param {HTMLElement} el - Element that is going to be rotated
 * @param {mousemove} evt - Mouse event data
 */
function getAngleFromCursor(el, evt) {
    const elRect = el.getBoundingClientRect()
    const svgCenter = {
        x: elRect.left + elRect.width / 2,
        y: elRect.top + elRect.height / 2
    }

    return (
        Math.atan2(evt.pageX - svgCenter.x, -(evt.pageY - svgCenter.y)) *
        (180 / Math.PI)
    )
}

export default getAngleFromCursor
