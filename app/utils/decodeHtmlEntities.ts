
/*
 * This function is used to decode HTML entities. Useful for setting head title tags.
 * Will convert ``&amp;#8211;`` into `-` for example.
 */
const decodeHtmlEntities = (string = '') => {
    return string
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        .replace(/&amp;/g, '&')
}

export default decodeHtmlEntities