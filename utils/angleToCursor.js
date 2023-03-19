/*
 * Get the angle from the cursor to the provided element
 * @param {HTMLElement} el - Element that is going to be rotated
 * @param {mousemove} evt - Mouse event data
 * @param {string} orientation - The orientation where zero should be
 * @return {Number} - The angle in degrees the cursor is to the element
 */
function getAngleToCursor(el, evt, orientation = "north") {
    // get normal angle from mouse to element
    const mouseX = evt.clientX
    const mouseY = evt.clientY
    const elRect = el.getBoundingClientRect()
    const elX = elRect.left + elRect.width / 2
    const elY = elRect.top + elRect.height / 2

    let rads = Math.atan2(mouseY-elY, mouseX-elX)
    const whole = Math.PI * 2

    // Change where zero is located
    switch(orientation) {
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

    // ReConvert rads into degrees
    return rads * 180 / Math.PI
}