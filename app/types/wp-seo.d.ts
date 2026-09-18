// Yoast SEO head data, from fuxt-api's optional `seo` field (fields=seo).
// Keys are camelCased from Yoast's yoast_head_json by useWpFetch, except `schema`,
// which is left verbatim: its JSON-LD keys (@context, @graph, @id) are part of the schema.org contract.

export type WpSeoImage = {
    url: string
    width?: number
    height?: number
    type?: string
    alt?: string
}

export type WpSeo = {
    title?: string
    description?: string
    canonical?: string
    author?: string
    robots?: {
        index?: string
        follow?: string
        maxSnippet?: string
        maxImagePreview?: string
        maxVideoPreview?: string
    }
    ogLocale?: string
    ogType?: string
    ogTitle?: string
    ogDescription?: string
    ogUrl?: string
    ogSiteName?: string
    ogImage?: WpSeoImage[]
    articlePublishedTime?: string
    articleModifiedTime?: string
    twitterCard?: string
    twitterTitle?: string
    twitterDescription?: string
    twitterImage?: string
    twitterSite?: string
    twitterCreator?: string
    // JSON-LD graph, ready for JSON.stringify() into a <script type="application/ld+json">
    schema?: Record<string, unknown>
}
