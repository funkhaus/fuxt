/*
 * Replace hyphen with emdash
 */
function emdashed(value: string = ""): string {
    if (!value) {
        return ""
    }

    // Replace hyphen with emdash if value is a string
    if (typeof value === "string" || value instanceof String) {
        value = value.replace(/ &#8211 /g, " — ").replace(/ - /g, " — ")
    }
    
    return value
}

export default emdashed
