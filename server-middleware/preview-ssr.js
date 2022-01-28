/*
 * NOTE This is serverMiddleware
 * This is a SSR friendly way to force a preview to render client side only (so auth cookies work).
 * For a static site, use the preview.client.js plugin
 */
export default function (req, res, next) {
    const parts = req.url.split("?")
    const queryParams = parts[1] || ""

    if (
        queryParams.includes("preview=true") ||
        queryParams.includes("preview=1")
    ) {
        // Will trigger the "traditional SPA mode", meaning client side only render
        res.spa = true
    }

    // Don't forget to call next in all cases!
    next()
}
