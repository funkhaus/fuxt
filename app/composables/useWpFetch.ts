// Fetch from WP, parse response to camelCase object and return ref
export function useWpFetch(endpoint: string, options: object = {}) {
    const baseURL = useRuntimeConfig().public.wordpressApiUrl
    const { enabled } = usePreviewMode()

    const response = useFetch(endpoint, {
        transform: (data) => {
            return keysToCamelCase(data || {})
        },
        onRequest({ options }) {
            // Add credentials to fetch request if preview enabled
            if (enabled.value) {
                options.credentials = 'include'
            }
        },
        baseURL,
        ...options,
        server: !enabled.value
    })

    return response
}
