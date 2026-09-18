import type { WpSeo } from '~/types'

export type PageSeoData = {
    // Route path this data describes. wp-seo ignores state that belongs to a different route.
    path?: string
    title?: string
    description?: string
    imageUrl?: string
    // Yoast SEO head data. Null when the backend has none for this post (or doesn't support it).
    seo?: WpSeo | null
}

// Bridge between page-level WP fetches and wp-seo.

// useWpFetch populates this automatically for the POST request that matches the current route; wp-seo reads it.
export function usePageSeo() {
    return useState<PageSeoData>('page-seo', () => ({}))
}
