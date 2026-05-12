type PageSeoData = {
    title?: string
    description?: string
    imageUrl?: string
}

// Bridge between page-level WP fetches and wp-seo.
// Pages set this after their useWpFetch call; wp-seo reads it instead of fetching.
export function usePageSeo() {
    return useState<PageSeoData>('page-seo', () => ({}))
}
