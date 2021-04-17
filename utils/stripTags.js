/*
 * Takes a string and stipes HTML tags from it
 */
function stripTags(str) {
    return str.replace(/<[^>]*>?/gm, "")
}

export default stripTags
