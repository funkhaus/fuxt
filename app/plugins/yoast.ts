/**
 * Yoast SEO head integration.
 *
 * Renders Yoast's `yoast_head_json` (SEO title, meta description, canonical,
 * Open Graph, Twitter card, JSON-LD schema) into every page's <head>, for both
 * SSR HTML (crawlers) and client-side navigation.
 *
 * How it works, in one request:
 *   Resolve the current route to its WordPress entity through the existing
 *   `fuxt` API (`/post?uri=<path>`), which returns Yoast's `yoast_head_json`
 *   inline (added by fuxt-api's Yoast_Seo class). No separate WP REST hop.
 *
 * Routes with no WP entity (archives, `/search/`) fall back to the site settings
 * — self-referencing canonical plus the site title, description and social image —
 * so they still get a share card and a paginated set can't read as duplicates.
 *
 * Two things this deliberately does NOT do:
 *   - It never runs for a path the region middleware is about to redirect away
 *     from. Plugins resolve before the router's first navigation, so `route.path`
 *     here is the pre-redirect path; fetching for it burnt a WordPress call on
 *     every request to `/` and logged a warning each time.
 *   - It never blocks the client. On the server the lookup is awaited (the tags
 *     must be in the HTML); on the client the payload already holds the answer,
 *     so navigation lookups run in the background and patch the head when done.
 */

import {
    RiosRegionOrder,
    pathSegmentFromRiosRegion,
    riosRegionKeyFromPathSegment,
    type RiosRegionKey
} from '~/stores/geolocation'
import {
    regionRootRedirectTargetPath,
    unprefixedRegionalRedirectTargetPath
} from '~/utils/rios-region-path'

/**
 * Request-time renders cap these calls rather than stall (Netlify's function limit
 * would kill the render anyway). A prerender is a different situation: nobody is
 * waiting, and the build fires hundreds of these at WordPress at once. At 2.5s that
 * made 114 of the first 256 prerendered routes time out and ship with no Yoast tags
 * at all — permanently, because a prerendered page is a static file with no
 * revalidation. Give the build room.
 *
 * `import.meta.prerender` is only true in the server bundle during prerendering;
 * anywhere it is undefined this falls through to the request-time value, which is
 * the correct one for both SSR and the client.
 */
const WP_TIMEOUT_MS = import.meta.prerender ? 45000 : 2500

/**
 * Last-resort share image, resolved against the frontend origin. Pages Yoast has
 * no image for first use the "Social shared image" ACF field; this favicon only
 * applies when that field is also empty.
 *
 * The favicon is square (450x450), so where it is used the Twitter card drops
 * from `summary_large_image` to `summary` — a large-image card crops to 2:1 and
 * would squash the logo.
 */
const FALLBACK_OG_IMAGE_PATH = '/favicon.png'

/** BCP-47 tag per region, for the hreflang cluster on regional routes. */
const REGION_HREFLANG: Record<RiosRegionKey, string> = {
    usa: 'en-US',
    globalUk: 'en-GB',
    sea: 'en-SG',
    china: 'zh-CN'
}

type YoastOgImage = {
    url?: string
    width?: number
    height?: number
    type?: string
    alt?: string
}

type YoastHeadJson = {
    title?: string
    description?: string
    robots?: Record<string, string>
    canonical?: string
    og_locale?: string
    og_type?: string
    og_title?: string
    og_description?: string
    og_url?: string
    og_site_name?: string
    og_image?: YoastOgImage[]
    twitter_card?: string
    twitter_title?: string
    twitter_description?: string
    author?: string
    article_published_time?: string
    article_modified_time?: string
    schema?: { '@context'?: string, '@graph'?: unknown[] }
}

/** What we resolved for a path — `entityType` drives the `og:type` correction. */
type YoastResolved = {
    head: YoastHeadJson | null
    entityType: string
}

export default defineNuxtPlugin(async () => {
    const route = useRoute()
    const { public: { wordpressApiUrl } } = useRuntimeConfig()
    // WordPress already tells us the frontend origin; `init.ts` sorts before this
    // plugin and awaits, so settings are populated by the time the head is built.
    const siteStore = useSiteStore()

    // Shared state — serialised to the client payload via the reliable `state`
    // section, so SSR and client render the same tags (and to skip a redundant
    // client refetch on first load).
    const currentPath = useState<string>('yoast-path', () => '')
    const yoastTitle = useState<string>('yoast-title', () => '')
    const yoastHead = useState<YoastHeadJson | null>('yoast-head', () => null)
    const yoastEntityType = useState<string>('yoast-entity-type', () => '')

    let requestId = 0

    /**
     * Frontend origin per WordPress, without a trailing slash. Only used to build
     * absolute URLs that Yoast does not supply — the self-referencing canonical on
     * routes with no WP entity, and the hreflang cluster. Yoast's own canonical and
     * og:url are already built from this same WordPress `home` option, so they pass
     * through untouched.
     */
    const siteOrigin = computed(() => String(siteStore.settings?.frontendUrl || '').replace(/\/+$/, ''))

    /**
     * True when the region middleware will move this path elsewhere. Plugins run
     * before the router's first navigation, so without this check every request to
     * `/`, `/work/` or `/usa/` did the full SEO lookup for a path that then 302s.
     */
    const willRedirect = (path: string): boolean => {
        if (regionRootRedirectTargetPath(path)) return true
        // The region segment is irrelevant here — only whether a rule applies at all.
        return Boolean(unprefixedRegionalRedirectTargetPath(path, 'usa'))
    }

    const load = async () => {
        const path = route.path
        const id = ++requestId

        // Already resolved for this path. Matching on the path alone (not on a
        // non-empty result) is what keeps an entity-less route — every archive,
        // `/search/`, any 404 — from refetching on the client after SSR already
        // established there is nothing to find.
        if (currentPath.value === path) return

        if (willRedirect(path)) {
            currentPath.value = path
            yoastHead.value = null
            yoastEntityType.value = ''
            yoastTitle.value = ''
            return
        }

        const resolved: YoastResolved = { head: null, entityType: '' }
        try {
            // fuxt's /post endpoint returns yoast_head_json inline (added by fuxt-api's Yoast_Seo class).
            const entity = await $fetch<{ id?: number, type?: string, yoast_head_json?: YoastHeadJson } | null>(
                `${wordpressApiUrl}/post`,
                { query: { uri: path }, timeout: WP_TIMEOUT_MS }
            )

            if (entity?.yoast_head_json) {
                resolved.head = entity.yoast_head_json
                resolved.entityType = entity.type || ''
            }
        }
        catch (e) {
            // A miss is normal (archives have no entity); only note real failures.
            const status = (e as { statusCode?: number })?.statusCode
            if (status !== 404) {
                console.warn('[yoast] head lookup failed for', path, e)
            }
        }

        // Ignore results superseded by a newer navigation
        if (id !== requestId) return

        currentPath.value = path
        yoastHead.value = resolved.head
        yoastEntityType.value = resolved.entityType
        yoastTitle.value = resolved.head?.title || ''
    }

    /*
     * The server must have the tags before it renders the head, so it waits. The
     * client already has them in the payload, so it never does — a navigation
     * lookup resolves in the background and the reactive `useHead` below patches
     * the tags when it lands.
     */
    if (import.meta.server) {
        await load()
    }
    else {
        void load()
    }
    watch(() => route.fullPath, () => {
        void load()
    })

    // ---- helpers used by the head builder ----

    /** `og:type` per entity: Yoast reports `article` for everything, which is wrong for both. */
    const openGraphType = (fromYoast: string | undefined, entityType: string): string => {
        if (entityType === 'page') return 'website'
        if (entityType === 'people') return 'profile'
        return fromYoast || 'article'
    }

    /** hreflang cluster for the four regional variants of the current path. */
    const regionAlternates = () => {
        if (!siteOrigin.value) return []

        const raw = route.params.region
        const segment = Array.isArray(raw) ? raw[0] : raw
        if (!segment || !riosRegionKeyFromPathSegment(segment)) return []

        const rest = route.path.replace(/^\/[^/]+/, '')
        const links = RiosRegionOrder.map(key => ({
            rel: 'alternate',
            hreflang: REGION_HREFLANG[key],
            href: `${siteOrigin.value}/${pathSegmentFromRiosRegion(key)}${rest}`
        }))

        links.push({
            rel: 'alternate',
            hreflang: 'x-default',
            href: `${siteOrigin.value}/${pathSegmentFromRiosRegion('usa')}${rest}`
        })

        return links
    }

    /**
     * Yoast's schema graph is emitted as-is. unhead escapes `</script` in script
     * content, so inlining the raw JSON is safe.
     */
    const schemaScript = (h: YoastHeadJson | null) => {
        if (!h?.schema) return []
        return [{
            key: 'yoast-schema',
            type: 'application/ld+json',
            innerHTML: JSON.stringify(h.schema)
        }]
    }

    useHead(() => {
        const h = yoastHead.value
        const image = h?.og_image?.[0]

        // Yoast frequently fills only one of these. Sharing them means a page with
        // an og:description still gets a meta description, and vice versa.
        const description = h?.description || h?.og_description || ''
        const ogDescription = h?.og_description || h?.description || ''
        // Prefer the "Social shared image" ACF field; the square favicon is a
        // last resort (a large-image card would squash it, so it drops to 'summary').
        const socialImage = siteStore.settings?.socialSharedImage?.src || ''
        const faviconImage = FALLBACK_OG_IMAGE_PATH && siteOrigin.value
            ? `${siteOrigin.value}${FALLBACK_OG_IMAGE_PATH}`
            : ''
        const fallbackImage = socialImage || faviconImage
        const imageUrl = image?.url || fallbackImage
        const isFaviconFallback = Boolean(faviconImage) && imageUrl === faviconImage

        /*
         * Site-wide fallbacks so a link to a page Yoast knows nothing about still
         * has a share card instead of a bare URL. Deliberately og:* only — the same
         * description repeated as `meta description` on every page is worse for
         * search than having none, but a share card with no title is just broken.
         */
        const siteTitle = String(siteStore.settings?.title || '')
        const siteDescription = String(siteStore.settings?.description || '')

        // Self-referencing canonical for routes Yoast knows nothing about, so a
        // paginated archive cannot read as a duplicate of its own first page.
        const canonical = h?.canonical
            || (siteOrigin.value ? `${siteOrigin.value}${route.path}` : '')

        const ogUrl = h?.og_url || canonical

        const meta: Record<string, string>[] = []
        if (description) {
            meta.push({ name: 'description', content: description })
        }
        if (h?.robots) {
            // A page-level `noindex` must win. Without `tagPriority` it only did so
            // by accident of plugins running before component setup.
            meta.push({
                name: 'robots',
                content: Object.values(h.robots).join(', '),
                tagPriority: 'low'
            })
        }
        if (h?.og_locale) {
            meta.push({ property: 'og:locale', content: h.og_locale })
        }
        // Archives have no Yoast entity but still get a share card, so they need a
        // type rather than an og:image with nothing to describe it.
        meta.push({
            property: 'og:type',
            content: h ? openGraphType(h.og_type, yoastEntityType.value) : 'website'
        })
        const ogTitle = h?.og_title || siteTitle
        if (ogTitle) {
            meta.push({ property: 'og:title', content: ogTitle })
        }
        const ogDesc = ogDescription || siteDescription
        if (ogDesc) {
            meta.push({ property: 'og:description', content: ogDesc })
        }
        if (ogUrl) {
            meta.push({ property: 'og:url', content: ogUrl })
        }
        const ogSiteName = h?.og_site_name || siteTitle
        if (ogSiteName) {
            meta.push({ property: 'og:site_name', content: ogSiteName })
        }
        if (imageUrl) {
            meta.push({ property: 'og:image', content: imageUrl })
            meta.push({ name: 'twitter:image', content: imageUrl })
        }
        if (image?.width && !isFaviconFallback) {
            meta.push({ property: 'og:image:width', content: String(image.width) })
        }
        if (image?.height && !isFaviconFallback) {
            meta.push({ property: 'og:image:height', content: String(image.height) })
        }
        if (image?.type) {
            meta.push({ property: 'og:image:type', content: image.type })
        }
        if (image?.alt) {
            meta.push({ property: 'og:image:alt', content: image.alt })
        }
        if (h?.article_published_time) {
            meta.push({ property: 'article:published_time', content: h.article_published_time })
        }
        if (h?.article_modified_time) {
            meta.push({ property: 'article:modified_time', content: h.article_modified_time })
        }
        if (h?.author) {
            meta.push({ name: 'author', content: h.author })
        }
        if (h?.twitter_card || imageUrl) {
            meta.push({
                name: 'twitter:card',
                content: isFaviconFallback ? 'summary' : (h?.twitter_card || 'summary_large_image')
            })
        }
        if (h?.twitter_title) {
            meta.push({ name: 'twitter:title', content: h.twitter_title })
        }
        if (h?.twitter_description) {
            meta.push({ name: 'twitter:description', content: h.twitter_description })
        }

        const link: Record<string, string>[] = []
        if (canonical) {
            link.push({ rel: 'canonical', href: canonical })
        }
        link.push(...regionAlternates())

        return {
            title: yoastTitle.value || undefined,
            meta,
            link,
            script: schemaScript(h)
        }
    })
})
