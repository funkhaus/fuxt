/*
 * Returns the document height.
 */
function getDocHeight() {
    // I on server, there will be no document or window, so abort
    if (process.server) {
        return 0
    }

    // Get the biggest of all of these...
    return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    )
}
export default getDocHeight
