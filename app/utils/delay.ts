/*
 * Used as an async/await friendly alternative to setTimeout
 */

const delay = (time: number = 0): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
export default delay