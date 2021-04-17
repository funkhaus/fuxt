/*
 * Add a trailing slash to end of a string always
 */
function trailingSlash(string = "") {
    if (!string) {
        return ""
    }
    return (string += string.endsWith("/") ? "" : "/")
}

export default trailingSlash
