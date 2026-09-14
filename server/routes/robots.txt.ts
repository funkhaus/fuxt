/**
 * `robots.txt`.
 *
 * Without this the frontend has no robots.txt at all — and because a Nuxt catch-all
 * page answers the path, a crawler asking for `/robots.txt` gets `200 text/html`
 * rather than a 404. A 2xx is treated as a *valid* robots.txt and parsed, so the
 * site ends up allow-all by accident instead of by decision, and there is nowhere
 * to advertise the sitemap.
 *
 * A route rather than `public/robots.txt` because the `Sitemap:` directive has to be
 * an absolute URL: a static file would have to hardcode one domain, and would then
 * point at the staging domain for the life of the project. Reading the origin off the
 * request is correct on Netlify previews, the production domain and localhost alike,
 * with nothing to configure per fork.
 *
 * Crawler policy is deliberately allow-all and deliberately NOT opinionated about AI
 * crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot). Blocking or
 * allowing those is the client's business decision — add per-agent rules here only
 * when they have actually asked for them.
 */

const CACHE = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'

export default defineEventHandler((event) => {
    setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

    if (event.method !== 'GET' && event.method !== 'HEAD') {
        setResponseStatus(event, 405)
        setResponseHeader(event, 'allow', 'GET, HEAD')

        return 'Method not allowed\n'
    }

    // Behind Netlify the request lands on an internal host, so the forwarded headers
    // are the only way to recover the domain the visitor actually asked for.
    const { origin } = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true })

    setResponseHeader(event, 'cache-control', CACHE)

    return [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${origin}/sitemap.xml`,
        ''
    ].join('\n')
})
