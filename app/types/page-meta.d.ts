/**
 * Route meta this app adds, so `definePageMeta()` and `route.meta` type it.
 *
 * Both interfaces are augmented on purpose: `PageMeta` is what `definePageMeta()`
 * accepts, `RouteMeta` is what reading `route.meta` gives back.
 */

declare module '#app' {
    interface PageMeta {
        /**
         * Exact text for the page's `<h1>` — see `usePageHeading()`. Rendered server-side,
         * so this is what a crawler that does not run JavaScript reads.
         *
         * `false` renders no `<h1>` in the layout, for a page whose design already has a
         * real visible one.
         */
        pageHeading?: string | false
    }
}

declare module 'vue-router' {
    interface RouteMeta {
        pageHeading?: string | false
    }
}

export {}
