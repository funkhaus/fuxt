type PageSeoData = {
    title?: string
    description?: string
    imageUrl?: string
}

// Bridge between page-level WP fetches and wp-seo.

// useWpFetch populates this automatically for POST requests; wp-seo reads it.
export function usePageSeo() {
    return useState<PageSeoData>('page-seo', () => ({}))
}
