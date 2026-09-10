/*
 * This function is used to decode HTML entities. Useful for setting head title tags
 * and the page `<h1>` — WordPress hands both over encoded.
 *
 * Will convert `&#8211;` into `-` for example.
 *
 * Covers decimal (`&#8217;`), hexadecimal (`&#x2019;`) and the named entities
 * WordPress actually emits in titles. `&amp;` is decoded last on purpose, so a
 * double-encoded `&amp;lt;` ends up as the literal text `&lt;` rather than a `<`.
 */

/** Named entities WordPress emits in titles. `&amp;` is handled separately, after these. */
const NAMED_ENTITIES: Record<string, string> = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&nbsp;': ' ',
    '&hellip;': '…',
    '&ndash;': '–',
    '&mdash;': '—',
    '&lsquo;': '‘',
    '&rsquo;': '’',
    '&ldquo;': '“',
    '&rdquo;': '”'
}

/** `fromCodePoint` (not `fromCharCode`) so entities above U+FFFF survive; invalid ones stay as-is. */
function fromCodePoint(code: number, original: string) {
    if (!Number.isFinite(code) || code < 0 || code > 0x10FFFF) {
        return original
    }
    return String.fromCodePoint(code)
}

function decodeHtmlEntities(string = '') {
    return String(string || '')
        .replace(/&#(\d+);/g, (match, dec) => fromCodePoint(parseInt(dec, 10), match))
        .replace(/&#x([0-9a-f]+);/gi, (match, hex) => fromCodePoint(parseInt(hex, 16), match))
        .replace(/&[a-z]+;/gi, match => NAMED_ENTITIES[match.toLowerCase()] ?? match)
        .replace(/&amp;/g, '&')
}

export default decodeHtmlEntities
