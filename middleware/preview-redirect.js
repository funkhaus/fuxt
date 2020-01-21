/*
 * This file controls redirects of WordPress preview URLs.
 * It requires the wp-graph-ql-cors plugin to WordPress
 */
export default function({ route, redirect }) {

    // No query in URL, so just skip all this
    if (!route.query) {
        return
    }

    switch (true) {
        case Boolean(route.query.preview) && !route.query.slug:
            return ctx.error({
                statusCode: 404,
                message:
                    "For WordPress preview's to work, you need to publish the post/page first, then re-save it as a draft."
            })
            break

        case Boolean(route.query.preview) && Boolean(route.query.path):
            redirect(route.query.path)
            break

        case Boolean(route.query.preview) && Boolean(route.query.id):
            // Could do a Apollo request from ID here? Not sure how to send data to page?
            // Maybe it comes from cache? Maybe it just works becuase route is path?
            break
    }
}