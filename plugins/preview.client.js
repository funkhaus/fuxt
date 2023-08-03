/*
 * This plugin enables Nuxt Preview mode.
 * It also allows some custom routing if your WP preview URL's are different than the frontend routes.
 * And exmaple of a WordPress preview URL:
 *    https://example.com/news/p/post-slug-here/?preview=true&id=1234&type=post&status=publish&slug=post-slug-here&uri=/news/p/post-slug-here/
 */
export default function (context) {
    const { query, store, enablePreview, $graphql } = context

    // Force dev tools in production, useful for testing Netlify deploys
    // Object.assign(Vue.config, { devtools: true })

    // Enable Nuxt Preview mode
    if (query.preview) {
        $graphql.default.setHeaders({ Preview: true })
        enablePreview()
    } else {
        $graphql.default.setHeaders({})
    }

    // Populate Vuex when running in SPA mode (like for hidden pages or on Preview)
    if (!store?.state?.siteMeta?.title || false) {
        store.dispatch("nuxtGenerateInit", context)
    }

    // Can handle some redirects here if Preview URLs are different than frontend.
    // Use things like Boolean(query.preview) && Boolean(query.uri) to redirect() to desired frotnend routes.
}
