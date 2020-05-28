/*
 * This file controls redirects of WordPress preview URLs.
 * It requires the wp-graph-ql-cors plugin to WordPress
 */
export default function({ route, redirect, error }) {
    // No query in URL, so just skip all this
    if (!route.query) {
        return
    }

    switch (true) {
        case Boolean(route.query.preview) && !route.query.slug:
            return error({
                statusCode: 404,
                message:
                    "For WordPress preview's to work, you need to publish the post/page first, then re-save it as a draft."
            })
            break

        case Boolean(route.query.preview) && Boolean(route.query.path):
            let uri = route.query.path

            // Custom Preview routing
            switch (route.query.type) {
                case "post":
                    uri = `news/${uri}`
                    break
            }

            redirect(`/${uri}/?preview=true`)
            break
    }

    return
}
