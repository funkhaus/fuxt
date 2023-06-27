/*
 * Checks if the color is dark, returns true or false depending of the brightness of the color, 255 being lightest, 0 being darkest
https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
 */

function isDark(color) {
    let hex = color.replace("#", "")
    let c_r = parseInt(hex.substr(0, 2), 16)
    let c_g = parseInt(hex.substr(2, 2), 16)
    let c_b = parseInt(hex.substr(4, 2), 16)
    let brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000

    return brightness < 155
    // if brightness is more then 155 the color is to be considered dark
}

export default isDark
