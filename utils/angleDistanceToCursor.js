/*
 * Get the angle from the cursor to the provided element
 * @param {mousemove} evt - Mouse event data
 * @param {HTMLElement} el - Element that is going to be rotated
 * @param {string} orientation - The orientation where zero should be
 * @return {Object} - Object with angle in degrees the cursor is to the element, and distance in px.
 */
function angleDistanceToCursor(evt, el, orientation = "north") {
    // get normal angle from mouse to element
    const mouseX = evt.clientX
    const mouseY = evt.clientY
    const elRect = el.getBoundingClientRect()
    const elX = elRect.left + elRect.width / 2
    const elY = elRect.top + elRect.height / 2

    let rads = Math.atan2(mouseY - elY, mouseX - elX)

    const whole = Math.PI * 2

    // Change where zero is located
    switch (orientation) {
        case "south":
            rads -= whole / 4
            break

        case "east":
            rads += 0
            break

        case "north":
            rads += whole / 4
            break

        case "west":
            rads += whole / 2
            break
    }

    // convert rads to range between 0 and 360 (although still in radians)
    rads = ((rads % whole) + whole) % whole

    // Convert rads into degrees
    const angle = (rads * 180) / Math.PI

    // Calc distance
    const distance = Math.floor(
        Math.sqrt(Math.pow(mouseX - elX, 2) + Math.pow(mouseY - elY, 2))
    )

    return {
        angle,
        distance
    }
}

export default angleDistanceToCursor
