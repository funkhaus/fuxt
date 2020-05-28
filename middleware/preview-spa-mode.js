/*
 * NOTE This is serverMiddlewear
 * This file will force Nuxt to render in SPA mode when ?preview=true is in the URL.
 * This makes previewing pages in WordPress work cleint-side only.
 */
export default function(req, res, next) {
    // req is the Node.js http request object
    // res is the Node.js http response object

    if (req.url && req.url.includes("preview=true")) {
        res.spa = true
    }

    next()
}
