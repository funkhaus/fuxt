/*
 * Splits a string by the separator and optionally keeps the separator in the result.
 * Used primarily for separating text at an emdash (—).
 */
const splitAtDash = (
    text: string = '',
    separator: string = ' — ',
    keepSeparator: boolean = false
): string[] => {
    // Escape special regex characters in separator
    const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escapedSeparator, keepSeparator ? 'g' : undefined)

    if (keepSeparator) {
        // Split and keep separator by using a capturing group
        return text.split(new RegExp(`(${escapedSeparator})`, 'g')).filter(Boolean)
    } else {
        return text.split(regex)
    }
}

export default splitAtDash
