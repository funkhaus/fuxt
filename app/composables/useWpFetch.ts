import type { WpMenuResponse, WpPageResponse, WpSiteOptionsResponse, WpSettingsResponse } from '~/types'

export enum RequestType {
    POSTS = 'posts',
    POST = 'post',
    MENUS = 'menus',
    SETTINGS = 'settings',
    SITE_OPTIONS = 'acf-options?name=Site Options'
}

// Mapping type per endpoint
type EndpointTypeMap = {
    'posts': WpPageResponse[]
    'post': WpPageResponse
    'menus': WpMenuResponse[]
    'settings': WpSettingsResponse
    'acf-options?name=Site Options': WpSiteOptionsResponse
    // add more mappings as needed
}

// Conditional return type based on endpoint string
type ResponseType<K extends keyof EndpointTypeMap> = EndpointTypeMap[K]

type WpFetchOptions = Record<string, unknown> & {
    server?: boolean
    /**
     * Page SEO ownership for POST requests.
     * - undefined (default): owns the page SEO only when the request `uri` matches the current route
     * - true: force ownership, for a page whose fetch uri differs from its route (eg: `uri: '/home/'` on `/`)
     * - false: never owns the page SEO (related posts, teasers) and skips the `seo` field
     */
    seo?: boolean
}

// Fields wp-seo reads from the page response, kept when the caller trims the response with `pick`
const SEO_PICK_FIELDS = ['title', 'excerpt', 'featuredMedia', 'seo']

// Fetch from WP, parse response to camelCase object and return ref
export function useWpFetch<K extends keyof EndpointTypeMap>(endpoint: K, options: WpFetchOptions = {}) {
    const baseURL = useRuntimeConfig().public.wordpressApiUrl
    const { enabled: isPreviewEnabled } = usePreviewMode()

    const { server: serverFromCaller, seo: seoFromCaller, ...fetchOptions } = options
    const autoSeo = seoFromCaller !== false
    const isPostRequest = endpoint === RequestType.POST

    const server = isPreviewEnabled.value
        ? false
        : (typeof serverFromCaller === 'boolean' ? serverFromCaller : true)

    if (isPostRequest && autoSeo) {
        // Request Yoast data (fuxt-api >= 0.1.5). Older backends ignore unknown field names.
        // A ref/getter query stays reactive (wrapped, not snapshotted) so useFetch still refetches when it changes.
        const originalQuery = fetchOptions.query as MaybeRefOrGetter<Record<string, unknown> | undefined>
        fetchOptions.query = isRef(originalQuery) || typeof originalQuery === 'function'
            ? computed(() => withSeoField(toValue(originalQuery)))
            : withSeoField(originalQuery)

        if (fetchOptions.pick) {
            const existing = Array.isArray(fetchOptions.pick) ? fetchOptions.pick as string[] : [fetchOptions.pick as string]
            fetchOptions.pick = [...new Set([...existing, ...SEO_PICK_FIELDS])]
        }
    }

    const response = useFetch(endpoint, {
        transform: (data) => {
            const raw = data as Record<string, unknown> | null | undefined

            // `in` (not a truthiness test) so a present-but-null `seo` is preserved
            if (!raw || typeof raw !== 'object' || Array.isArray(raw) || !('seo' in raw)) {
                return keysToCamelCase(data || {}) as ResponseType<K>
            }

            // Yoast's JSON-LD schema must keep its @context/@graph/@id keys verbatim
            const { seo, ...rest } = raw
            const seoData = seo as Record<string, unknown> | null
            const { schema, ...seoRest } = seoData || {}

            return {
                ...(keysToCamelCase(rest) as object),
                seo: seoData ? { ...(keysToCamelCase(seoRest) as object), ...(schema ? { schema } : {}) } : null
            } as ResponseType<K>
        },
        onRequest({ options }) {
            if (import.meta.server) {
                // Tell Flywheel's reverse proxy not to serve a cached response during generate/ISR
                options.headers = {
                    ...options.headers,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            }
            // Add credentials to fetch request if preview enabled
            if (isPreviewEnabled.value) {
                options.credentials = 'include'
            }
        },
        baseURL,
        ...fetchOptions,
        server
    })

    if (isPostRequest && autoSeo) {
        // Captured during setup: useState needs the Nuxt instance, which a later promise/watcher callback has lost.
        const nuxtApp = useNuxtApp()
        const route = useRoute()

        const publish = () => {
            const pageData = response.data.value as WpPageResponse | null
            if (!pageData) return

            // Evaluated per publish so a reactive query that refetches for a new route is judged against that
            // route, and a late response for a route the user already left doesn't overwrite the new page's SEO.
            const requestUri = toValue((toValue(fetchOptions.query) as Record<string, unknown> | undefined)?.uri)
            const ownsPageSeo = seoFromCaller === true
                || (typeof requestUri === 'string' && normalizePath(requestUri) === normalizePath(route.path))
            if (!ownsPageSeo) return

            nuxtApp.runWithContext(() => {
                usePageSeo().value = {
                    path: normalizePath(route.path),
                    title: pageData.title,
                    description: pageData.excerpt,
                    imageUrl: pageData.featuredMedia?.src,
                    seo: pageData.seo ?? null
                }
            })
        }

        // Vue doesn't run watchers during SSR, so publish off the settled request for the server render.
        // The watch keeps the client in step with refetches (reactive queries, refresh, preview).
        response.then(publish)
        watch(response.data, publish)
    }

    return response
}

// Copy of a POST query with the `seo` field requested and the uri normalized, so a page hashes to the
// same useFetch key whether rendered from `/about` or `/about/` (prerender routes vs crawled links).
function withSeoField(query: Record<string, unknown> | undefined): Record<string, unknown> {
    const uri = toValue(query?.uri)

    return {
        ...(query || {}),
        ...(typeof uri === 'string' ? { uri: normalizePath(uri) } : {}),
        fields: addField(query?.fields, 'seo')
    }
}

// Add a field to a fuxt-api `fields` param. Always sends a comma-separated string: fuxt-api
// validates the string form leniently (unknown names are ignored), but enum-validates the array form.
function addField(fields: unknown, field: string): string {
    const list = (Array.isArray(fields) ? fields.map(String) : String(fields || '').split(','))
        .map(item => item.trim())
        .filter(Boolean)

    if (!list.includes(field)) {
        list.push(field)
    }

    return list.join(',')
}
