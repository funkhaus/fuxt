/**
 * `llms.txt` proxy.
 *
 * Yoast SEO generates an `llms.txt` at the WordPress site root: a markdown index
 * of the site's pages and post types, written to be read by LLMs and agents
 * rather than by people. SEE https://yoast.com/help/enable-llmstxt/
 *
 * In a headless setup Yoast serves that file from the *CMS* domain — the one
 * domain nothing should ever cite. This route re-serves it from the frontend
 * origin, where an agent actually looks for it.
 *
 * Nothing to configure and nothing to enable: if WordPress serves the file, so
 * does this. If it doesn't — Yoast absent, the llms.txt feature switched off, a
 * password-walled backend, WordPress unreachable — this answers a plain 404 and
 * nothing else on the site notices. A fork that never turns the feature on just
 * has a 404 at `/llms.txt`, which is the correct answer to "is there one?".
 *
 * Deliberately NOT prerendered (nothing links to it, so `crawlLinks` won't find
 * it, and it is not in `prerender.routes`). A prerendered miss would bake the
 * 404 into the build and keep serving it long after the client switched the
 * feature on. Resolved per request — behind the cache headers below — it starts
 * working on its own.
 *
 * The URLs *inside* the file are Yoast's, built from WordPress's Home URL. They
 * are not rewritten here on purpose: in a correctly configured fuxt site Home URL
 * already points at the frontend (the same setting that makes Yoast's canonicals,
 * sitemap and og:url correct). If the links come out pointing at the CMS, that is
 * a WordPress misconfiguration breaking canonicals too — fix it there, not here.
 */

import type { H3Event } from 'h3'

/**
 * Request-time only, so this is the Netlify-function budget rather than the
 * generous prerender one `plugins/yoast.ts` needs. A slow WordPress should cost
 * one missing `llms.txt`, never a hung function.
 */
const WP_TIMEOUT_MS = 5000

/** A hit is stable for an hour and may be served stale for a day while revalidating. */
const CACHE_HIT = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'

/** A miss is cached briefly — enough to stop a crawler hammering WordPress, short
 *  enough that enabling the feature in Yoast shows up within the minute. */
const CACHE_MISS = 'public, max-age=0, s-maxage=60'

export default defineEventHandler(async (event) => {
    setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

    // `defineEventHandler` runs for every method, so without this a POST or DELETE
    // would be answered 200 with the file -- and would reach WordPress on the way.
    // A static document is readable and nothing else.
    if (event.method !== 'GET' && event.method !== 'HEAD') {
        setResponseStatus(event, 405)
        setResponseHeader(event, 'allow', 'GET, HEAD')

        return 'Method not allowed\n'
    }

    const wpRoot = getWordPressRoot()
    if (!wpRoot) return notFound(event)

    let raw: string

    try {
        const response = await $fetch.raw<string>('/llms.txt', {
            baseURL: wpRoot,
            responseType: 'text',
            timeout: WP_TIMEOUT_MS,
            headers: {
                'accept': 'text/plain',
                // Same reason `useWpFetch` sets these on every server-side request:
                // stop Flywheel's reverse proxy handing back a stale copy, so a
                // freshly published page shows up here without a deploy.
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
            // A non-2xx is an expected answer here (feature off, password wall),
            // not an exception. Handle it as data instead of a throw.
            ignoreResponseError: true
        })

        if (response.status !== 200) return notFound(event)

        // A password-walled or misconfigured WordPress answers with an HTML login
        // or error page — sometimes at status 200. Serving that as `llms.txt` is
        // worse than serving nothing.
        if (!response.headers.get('content-type')?.includes('text/plain')) {
            return notFound(event)
        }

        raw = String(response._data ?? '')
    }
    catch {
        // Timeout, DNS failure, refused connection, bad TLS.
        return notFound(event)
    }

    // Yoast emits a UTF-8 BOM ahead of the title; strip it so the file opens on
    // its `# Heading` the way the llms.txt spec expects.
    const body = raw.replace(/^\uFEFF/, '').trim()

    // Last check that this is the file we asked for and not something wearing a
    // text/plain header: the spec requires an H1 as the first line.
    if (!body.startsWith('# ')) return notFound(event)

    setResponseHeader(event, 'cache-control', CACHE_HIT)

    return `${body}\n`
})

/**
 * `WORDPRESS_API_URL` is the REST base (`…/wp-json/fuxt/v1`); `llms.txt` sits at the
 * WordPress *root*. Every current fork installs WordPress at a domain root, so the
 * origin alone would do — but cutting at `/wp-json` costs nothing and keeps a
 * subdirectory install (`https://host/cms/wp-json/…` → `https://host/cms`) working.
 *
 * Returns null rather than throwing when the env var is missing or unparseable: a
 * fork mid-setup should get a 404 here, not a 500.
 */
function getWordPressRoot(): string | null {
    const apiUrl = useRuntimeConfig().public.wordpressApiUrl

    if (!apiUrl) return null

    try {
        const url = new URL(apiUrl)

        return `${url.origin}${url.pathname.split('/wp-json')[0]}`.replace(/\/$/, '')
    }
    catch {
        return null
    }
}

/** Plain-text 404, so a failure never returns an HTML error page from a `.txt` URL. */
function notFound(event: H3Event): string {
    setResponseStatus(event, 404)
    setResponseHeader(event, 'cache-control', CACHE_MISS)

    return 'Not found\n'
}
