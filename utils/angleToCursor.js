/*
 * Get the angle from the cursor to the provided element
 * @param {HTMLElement} el - Element that is going to be rotated
 * @param {mousemove} evt - Mouse event data
 * @param {string} orientation - The orientation where zero should be
 */
function getAngleToCursor(el, evt, orientation = "north") {
    const mouseX = evt.clientX
    const mouseY = evt.clientY
    
    const elRect = el.getBoundingClientRect()
    const elX = elRect.left + elRect.width / 2
    const elY = elRect.top + elRect.height / 2

    const rads = Math.atan2(mouseY-elY, mouseX-elX)
    let angle = 0

    // Change where zero is located
    switch(orientation) {
        case "west":
            angle = rads * 180 / Math.PI + 180
            break;

        case "north":
            // 1.571 rads is 90degs. 
            // Formula is: 90° × π/180 = 1.571rad
            angle = (rads - 1.571) * 180 / Math.PI + 180
            break;  

        case "east":
        case "south":            
            // Can add these when/if needed
            break;
    }

    return angle
}

export default getAngleToCursor