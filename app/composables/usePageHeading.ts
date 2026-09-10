/**
 * Text for the automatic page `<h1>`, rendered once per document by
 * `<global-page-heading>` in the layout.
 *
 * Every page — including ones added years from now — gets a heading with no per-page
 * wiring, because the text is derived from what the route already knows: the Yoast
 * state `plugins/yoast.ts` and `useWpFetch` resolve, the route's own meta, and the
 * path itself.
 *
 * Source order matters. Yoast's SEO title has been through the site's title template,
 * so it arrives as "Site Name - Palisades Vista"; a heading must not carry that. The
 * entity's own WordPress title is therefore preferred, then the SEO title with the
 * site name stripped off either end, then the path, then the site name itself so the
 * element is never empty.
 *
 * ## Server vs client, and why the WordPress title is gated on mount
 *
 * The layout renders this heading before any page's `async setup` has resolved — Vue's
 * SSR buffer renders the layout's own subtree synchronously and only awaits the page's
 * promise afterwards. So on the server the fetched WordPress title is not yet in state:
 * only `route.meta`, the path, and the site settings are.
 *
 * Preferring the fetched title unconditionally would therefore render one string on the
 * server and a different one at hydration (the client restores that state from the
 * payload before its first render) — a text hydration mismatch on every page whose
 * title is not exactly its slug. `useMounted()` gates it: the server and the first
 * client render agree on the path-derived text, then the accurate title takes over.
 * Client-side navigation is already past mount, so it uses the accurate title at once.
 *
 * The practical consequence: crawlers that do not run JavaScript (including most AI
 * crawlers) see the path-derived heading. Where the slug is not a good heading — or the
 * page has no WordPress entity at all, like an archive or `/search/` — give the route an
 * exact one, which costs nothing and is rendered server-side:
 *
 *     definePageMeta({ pageHeading: 'News' })
 *
 * And where a page's design already puts a real, visible `<h1>` on the screen, tell the
 * layout to stand down rather than shipping a second one:
 *
 *     definePageMeta({ pageHeading: false })
 */

import decodeHtmlEntities from '~/utils/decodeHtmlEntities'

/** Yoast's title separators, per its `wpseo_titles` option. */
const TITLE_SEPARATORS = ['-', '|', '–', '—', '·', '•', '~', '«', '»', '<', '>']

/** Path segments that are structure rather than subject, so `/news/page/2/` reads as "News". */
const PAGINATION_SEGMENTS = ['page', 'p']

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Tags first, then entities — decoding first could turn `&lt;b&gt;` into markup. */
function normalize(value: string): string {
    return decodeHtmlEntities(String(value || '').replace(/<[^>]*>/g, ' '))
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * `"Palisades Vista - Site Name"` or `"Site Name - Palisades Vista"` → `"Palisades Vista"`.
 * Both ends, because Yoast's title template is editor-configurable and `app.vue`'s own
 * fallback template puts the site name first.
 */
function withoutSiteName(title: string, siteName: string): string {
    if (!title || !siteName) {
        return title
    }

    const site = escapeRegExp(siteName)
    const separator = `\\s*(?:${TITLE_SEPARATORS.map(escapeRegExp).join('|')})\\s*`

    return title
        .replace(new RegExp(`${separator}${site}\\s*$`, 'i'), '')
        .replace(new RegExp(`^\\s*${site}${separator}`, 'i'), '')
        .trim()
}

/** A percent-encoded slug is still a slug; a malformed one throws, so fall back to it raw. */
function decodeSegment(segment: string): string {
    try {
        return decodeURIComponent(segment)
    }
    catch {
        return segment
    }
}

/**
 * `/news/` → `"News"`. Carries the server render (see the note above) and is the last
 * resort for routes with no WordPress entity behind them — post type archives, `/search/`.
 */
function headingFromPath(path: string): string {
    const segments = path.split('/').filter(Boolean)
    const subject = segments.filter(segment => !PAGINATION_SEGMENTS.includes(segment) && !/^\d+$/.test(segment))

    return decodeSegment(subject[subject.length - 1] || '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, character => character.toUpperCase())
}

/**
 * Resolved heading text for the current route, or `''` when the page has claimed the
 * `<h1>` for itself via `definePageMeta({ pageHeading: false })`.
 *
 * Call from a component's `setup` — `useMounted()` needs the instance.
 */
export function usePageHeading() {
    const entityTitle = useYoastEntityTitle()
    const yoastTitle = useYoastTitle()
    const siteStore = useSiteStore()
    const route = useRoute()
    const isMounted = useMounted()

    return computed(() => {
        // Build-time meta, so this is the one override that is exact on the server too.
        const fromMeta = route.meta.pageHeading
        if (fromMeta === false) {
            return ''
        }
        if (fromMeta) {
            return normalize(fromMeta)
        }

        const siteName = normalize(String(siteStore.settings?.title || ''))

        if (isMounted.value) {
            const entity = normalize(entityTitle.value)
            if (entity) {
                return entity
            }

            const seoTitle = withoutSiteName(normalize(yoastTitle.value), siteName)
            if (seoTitle) {
                return seoTitle
            }
        }

        return headingFromPath(route.path) || siteName
    })
}
