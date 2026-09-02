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

// Fetch from WP, parse response to camelCase object and return ref
export function useWpFetch<K extends keyof EndpointTypeMap>(endpoint: K, options: object = {}) {
    const baseURL = useRuntimeConfig().public.wordpressApiUrl
    const { enabled: isPreviewEnabled } = usePreviewMode()

    const { server: serverFromCaller, seo: seoFromCaller, ...fetchOptions } = options as Record<string, unknown> & { server?: boolean, seo?: boolean }
    const autoSeo = seoFromCaller !== false

    const server = isPreviewEnabled.value
        ? false
        : (typeof serverFromCaller === 'boolean' ? serverFromCaller : true)

    const response = useFetch(endpoint, {
        transform: (data) => {
            // Yoast's `yoast_head_json` is a third-party contract, so it is the one
            // subtree that must survive verbatim: camelCasing recurses and would
            // rewrite `og_image` to `ogImage` and mangle the JSON-LD `@context`,
            // `@graph` and `@id` keys. Lift it out, camelCase the rest, put it back.
            // `in` (not a truthiness test) so a present-but-null value is preserved —
            // fuxt-api sends null when Yoast is active but the post is not indexable.
            const raw = data as Record<string, unknown> | null | undefined
            const hasYoastHead = typeof raw === 'object' && raw !== null && !Array.isArray(raw) && 'yoast_head_json' in raw

            if (!hasYoastHead) {
                return keysToCamelCase(data || {}) as ResponseType<K>
            }

            const { yoast_head_json: yoastHeadJson, ...rest } = raw as Record<string, unknown>

            return {
                ...(keysToCamelCase(rest) as object),
                yoastHeadJson
            } as ResponseType<K>
        },
        onRequest({ options }) {
            if (import.meta.server) {
                // Tell Flywheel's reverse proxy not to serve a cached response during generate/ISR
                options.headers = {
                    ...options.headers,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
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

    /*
     * A `/post` response already carries this route's Yoast head, so publish it
     * for the yoast plugin to render rather than let the plugin fetch the same
     * entity a second time.
     *
     * Pass `seo: false` for a `/post` request that is not the current route's own
     * entity (a related post, a sibling teaser); otherwise it would take over the
     * page's head, last write winning.
     */
    if (endpoint === RequestType.POST && autoSeo) {
        // Both captured at call time, while we are still in this page's setup:
        // read later, `route.path` would be the route the data landed on (on a
        // fast client nav, already the next one), and `useState` would have no
        // Nuxt instance to attach to.
        const nuxtApp = useNuxtApp()
        const path = useRoute().path

        const publish = () => {
            const pageData = response.data.value as WpPageResponse | null
            if (!pageData) return
            nuxtApp.runWithContext(() => {
                setYoastResolved(path, pageData.yoastHeadJson ?? null, pageData.type ?? '')
            })
        }

        // Vue does not run watchers during SSR, so the server has to publish off
        // the settled request itself — a watcher here would fire once with no data
        // and never again, and the plugin would then refetch this same entity. The
        // watch keeps the client in step with a later refresh or preview refetch.
        response.then(publish)
        watch(response.data, publish)
    }

    return response
}
