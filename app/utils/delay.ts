/*
 * Used as an async/await friendly alternative to setTimeout
 */
function delay(time: number = 0): Promise<void> {
    return new Promise((res) => {
        setTimeout(res, time)
    })
}

export default delay
