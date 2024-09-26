export async function useWpFetch(endpoint: string, options: object = {}) {
    const baseURL = useRuntimeConfig().public.wordpressApiUrl
    return await useFetch(endpoint, { ...options, baseURL })
}
