/*
 * This function builds out a Date using regaulr JS (not moment.js)
 */
function formatDate(date) {
    // Safari doesn't like the default WP-GQL date format, so need to replace the space with a T
    // See: https://stackoverflow.com/questions/21883699/safari-javascript-date-nan-issue-yyyy-mm-dd-hhmmss
    const d = new Date(date.replace(/\s/, "T"))
    const year = d.getFullYear()
    const month = d.toLocaleString("en-us", { month: "long" })

    const day = d.getDate().toString().padStart(2, "0")

    return `${month} ${day}, ${year}`
}

export default formatDate
