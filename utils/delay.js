/*
 * Used as an async/await friendly alternative to setTimeout
 */
function delay(time = 0) {
    return new Promise((res) => {
        setTimeout(res, time)
    })
}

export default delay
