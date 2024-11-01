import { withTrailingSlash, stringifyQuery } from 'ufo'

export default defineNuxtRouteMiddleware((to, from) => {
    const pathEndsWithSlash = to.path.endsWith('/')
    let redirectUrl = withTrailingSlash(to.path)

    switch (true) {
        case to.path == '/':
            // The home page
            return
            break

        case to.fullPath.includes('sitemap.xml'):
            return
            break

        case to.path.includes('.'):
            // This is most likly a request to a specific file, like filename.png,
            // Thus we don't want to add a trailingslash. Storybook does this with iframe.html
            return
            break

        case !pathEndsWithSlash:
            // Add a trailing slash always
            redirectUrl = withTrailingSlash(to.path)
            if (to.query) {
                redirectUrl = `${redirectUrl}?${stringifyQuery(to.query)}`
            }
            return navigateTo(redirectUrl, { redirectCode: 301 })
            break
    }
})
