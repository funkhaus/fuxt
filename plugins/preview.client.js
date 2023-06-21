/*
 * This plugin enables Nuxt Preview mode.
 * It also allows some custom routing if your WP preview URL's are different than the frontend routes.
 * And exmaple of a WordPress preview URL:
 *    https://example.com/news/p/post-slug-here/?preview=true&id=1234&type=post&status=publish&slug=post-slug-here&uri=/news/p/post-slug-here/
 */
export default function (context) {
    const { query, route, store, enablePreview, error, $graphql, redirect } =
        context

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
    switch (true) {
        case Boolean(query.preview) &&
            route.path == "/" &&
            (query.p || query.page_id):
            return error({
                statusCode: 404,
                message:
                    "For WordPress preview's to work, you first need to save the post/page as a draft."
            })
            break

        case Boolean(query.preview) && Boolean(query.uri):
            //let uri = decodeURI(query.uri)

            // Custom Preview routing here if you want
            // switch (query.type) {
            //     case "post":
            //         uri = `/blog/${query.slug}/`
            //         break
            // }

            //redirect(`${uri}?preview=true`)
            break
    }
}
