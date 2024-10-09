// Fetch from WP, parse response to camelCase object and return ref
export function useWpFetch(endpoint: string, options: object = {}) {
    const baseURL = useRuntimeConfig().public.wordpressApiUrl

    const response = useFetch(endpoint, {
        transform: (data) => {
            return convertKeysToCamelCase(data || {})
        },
        onRequest({ options }) {
            const { enabled } = usePreviewMode()

            // Add credentials to fetch request if preview enabled
            if (enabled.value) {
                options.credentials = 'include'
                options.headers = { ...options.headers, Preview: query.preview }
            }
        },
        baseURL,
        ...options
    })

    return response
}
