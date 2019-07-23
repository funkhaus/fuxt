/*
 * This function builds out a Date using regaulr JS (not moment.js)
 */
export const formatDate = date => {
    // Safari doesn't like the default WP-GQL date format, so need to replace the space with a T
    // See: https://stackoverflow.com/questions/21883699/safari-javascript-date-nan-issue-yyyy-mm-dd-hhmmss
    const d = new Date(date.replace(/\s/, "T"))
    const year = d.getFullYear()
    const month = d.toLocaleString("en-us", { month: "long" })

    const day = d
        .getDate()
        .toString()
        .padStart(2, "0")

    return `${month} ${day}, ${year}`
}

/*
 * This function is used to decode HTML entities. Useful for setting head title tags.
 * Will convert ``&amp;#8211;`` into `-` for example.
 */
export const decodeHtmlEntity = string => {
    return string.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec)
    })
}
