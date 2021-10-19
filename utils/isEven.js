/*
 * Checks if the number is even
 */

function isEven(value) {
    let output = false
    if (value % 2 == 0) {
        output = true
    }
    return output
}

export default isEven
