import { withTrailingSlash } from 'ufo'

export default defineNuxtRouteMiddleware((to, from) => {
    // TODO Make this work with other edge cases, like home page without `/` and ?foo&bar URLs
    if (!to.path.endsWith('/')) {
        // return navigateTo(withTrailingSlash(to.path))
    }
})
