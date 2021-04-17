import _get from "lodash/get"
import stripTags from "~/utils/stripTags"

/*
 * This function does a lodash _get, but removes HTML tags from the string.
 * Useful for setting head() description tags.
 */
function getStripped(obj, path, def = undefined) {
    const text = _get(obj, path, def)
        ? stripTags(_get(obj, path, def))
        : undefined
    return text
}

export default getStripped
