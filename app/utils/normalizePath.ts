/*
 * Normalize a route path or WP uri to the site convention: leading and trailing slash, decoded.
 * `/about`, `about/` and `/about/` all become `/about/`; the root stays `/`.
 *
 * Used for WP `uri` query params and route comparisons so that the same page hashes to the same
 * useFetch key whether it was rendered from `/about` (prerender routes) or `/about/` (crawled links).
 */
function normalizePath(path = ''): string {
    let decoded = String(path)
    try {
        decoded = decodeURI(decoded)
    }
    catch {
        // Malformed encoding: keep the raw path
    }

    const trimmed = decoded.replace(/^\/+|\/+$/g, '')

    return trimmed ? `/${trimmed}/` : '/'
}

export default normalizePath
