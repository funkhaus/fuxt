// Fetch from WP, parse response to camelCase object and return ref
export async function useWpFetch(endpoint: string, options: object = {}) {
    const baseURL = useRuntimeConfig().public.wordpressApiUrl
    const response = await useFetch(endpoint, { ...options, baseURL })

    // Convert all keys to camelCase
    if (response.data.value) {
        response.data.value = useConvertKeysToCamelCase(response.data.value || {})
    }

    return response
}
