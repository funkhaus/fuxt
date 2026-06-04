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

    if (endpoint === RequestType.POST && autoSeo) {
        const query = fetchOptions.query as Record<string, unknown> | undefined
        if (query?.pick) {
            const existing = Array.isArray(query.pick) ? query.pick as string[] : [query.pick as string]
            query.pick = [...new Set([...existing, 'title', 'excerpt', 'featuredMedia'])]
        }
    }

    const response = useFetch(endpoint, {
        transform: (data) => {
            return keysToCamelCase(data || {}) as ResponseType<K>
        },
        onRequest({ options }) {
            // Add credentials to fetch request if preview enabled
            if (isPreviewEnabled.value) {
                options.credentials = 'include'
            }
        },
        baseURL,
        ...fetchOptions,
        server
    })

    if (endpoint === RequestType.POST && autoSeo) {
        const pageSeo = usePageSeo()
        watch(response.data, (data) => {
            const pageData = data as WpPageResponse | null
            if (!pageData) return
            pageSeo.value = {
                title: pageData.title,
                description: pageData.excerpt,
                imageUrl: pageData.featuredMedia?.src
            }
        }, { immediate: true })
    }

    return response
}
