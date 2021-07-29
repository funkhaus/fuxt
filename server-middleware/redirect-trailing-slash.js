/*
 * NOTE This is serverMiddleware
 * This server middleware makes sure that all URL's end with a slash
 */
export default function (req, res, next) {
    // Simple way of handling query params
    const parts = req.url.split("?")
    const queryParams = parts[1] || ""
    const pathEndsWithSlash = parts[0].endsWith("/")

    switch (true) {
        case req.url.includes("sitemap.xml"):
            next()
            break

        case parts[0].includes("."):
            // This is most likly a request to a specific file, like filename.png,
            // Thus we don't want to add a trailingslash. Storybook does this with iframe.html
            next()
            break

        case !pathEndsWithSlash:
            let redirectUrl = `${parts[0]}/`
            if (queryParams) {
                redirectUrl = `${parts[0]}/?${queryParams}`
            }

            res.writeHead(301, { Location: redirectUrl })
            return res.end()
            break
    }

    next()
}
