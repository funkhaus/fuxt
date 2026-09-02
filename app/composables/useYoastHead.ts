/**
 * Shared state for Yoast's `yoast_head_json`.
 *
 * Two things write it, and they must agree on the shape:
 *   - `useWpFetch` stashes the payload a page already fetched (the common case —
 *     fuxt-api inlines `yoast_head_json` into `/post`, so no second request).
 *   - `app/plugins/yoast.ts` fetches it for routes with no WP entity (archives,
 *     `/search/`, 404s) and renders whatever is here into the <head>.
 *
 * Keys are Yoast's own snake_case, verbatim. `useWpFetch` deliberately exempts
 * this subtree from camelCasing — `og_image` and the JSON-LD `@context`/`@graph`
 * keys are a third-party contract, not ours to rewrite.
 */

export type YoastOgImage = {
    url?: string
    width?: number
    height?: number
    type?: string
    alt?: string
}

export type YoastHeadJson = {
    title?: string
    description?: string
    robots?: Record<string, string>
    canonical?: string
    og_locale?: string
    og_type?: string
    og_title?: string
    og_description?: string
    og_url?: string
    og_site_name?: string
    og_image?: YoastOgImage[]
    twitter_card?: string
    twitter_title?: string
    twitter_description?: string
    twitter_site?: string
    author?: string
    article_published_time?: string
    article_modified_time?: string
    schema?: { '@context'?: string, '@graph'?: unknown[] }
}

/**
 * The path the current state describes. Matching on the path alone (rather than
 * on a non-empty result) is what keeps an entity-less route — every archive,
 * `/search/`, any 404 — from refetching on the client after the server already
 * established there is nothing to find.
 */
export function useYoastPath() {
    return useState<string>('yoast-path', () => '')
}

export function useYoastHead() {
    return useState<YoastHeadJson | null>('yoast-head', () => null)
}

/** Drives the `og:type` correction — Yoast reports `article` for every entity. */
export function useYoastEntityType() {
    return useState<string>('yoast-entity-type', () => '')
}

/** Yoast's complete SEO title, applied verbatim by `app.vue`'s titleTemplate. */
export function useYoastTitle() {
    return useState<string>('yoast-title', () => '')
}

/**
 * Publish what we resolved for a path.
 *
 * Writes all four keys unconditionally and on purpose: a page's own stash has to
 * be able to replace a plugin fallback that resolved the same path first, and a
 * null head has to be able to clear a previous page's values on client nav.
 *
 * `useState` needs the Nuxt instance, and both callers write from a callback that
 * has lost it (a `watch` on fetched data, a `app:rendered`/`page:finish` hook), so
 * call this inside `nuxtApp.runWithContext()`.
 */
export function setYoastResolved(path: string, head: YoastHeadJson | null, entityType: string) {
    useYoastPath().value = path
    useYoastHead().value = head
    useYoastEntityType().value = entityType
    useYoastTitle().value = head?.title || ''
}
