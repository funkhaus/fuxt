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
        ...options,
        server: !isPreviewEnabled.value
    })

    return response
}
