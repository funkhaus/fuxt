/*
 * This server middleware makes sure that all URL's end with a slash
 */
export default function(req, res, next) {
    const parts = req.url.split("?")
    const pathEndsWithSlash = parts[0].endsWith("/")
    const queryParams = parts[1] || ""

    // Handle the redirect, account for ?foo=bar query parameters
    if (!pathEndsWithSlash) {
        let redirectUrl = `${parts[0]}/`
        if (queryParams) {
            redirectUrl = `${parts[0]}/?${queryParams}`
        }

        res.writeHead(301, { Location: redirectUrl })
        res.end()
        return
    }
    next()
}
