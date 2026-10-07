declare global {
    interface Window {
        dataLayer: unknown[]
    }
}

/*
 * Google Analytics (gtag.js) and Google Tag Manager for every ID set in the
 * "Google Analytics" repeater in WP Site Options.
 *
 * - `GTM-` IDs load as Tag Manager containers.
 * - Every other ID (`G-` GA4, `GT-` Google tag, `AW-` Ads) is configured through gtag.js.
 *
 * Page views are left to GA4: it sends one on load and, with enhanced measurement's
 * "page changes based on browser history events" (on by default), on every client-side
 * navigation. Sending page views manually here as well would double count them. If a
 * property has that setting turned off, route changes won't be counted; see the README.
 * https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
 */
export default defineNuxtPlugin(() => {
    const siteStore = useSiteStore()

    // Site Options stores IDs as repeater rows: [{ code: 'G-XXXX' }]
    const codes = (siteStore.settings?.googleAnalytics || [])
        .map(item => item?.code?.trim())
        .filter((code): code is string => Boolean(code))

    // No-op in dev or without IDs, so callers can always use $gtag safely
    if (!codes.length || import.meta.dev) {
        return {
            provide: {
                gtag: (..._args: unknown[]) => {}
            }
        }
    }

    const gtmCodes = codes.filter(code => code.startsWith('GTM-'))
    const tagCodes = codes.filter(code => !code.startsWith('GTM-'))

    // Init dataLayer before any GTM/gtag scripts
    window.dataLayer = window.dataLayer || []

    gtmCodes.forEach((code) => {
        if (document.getElementById(`gtm-${code}`)) return
        const script = document.createElement('script')
        script.async = true
        script.id = `gtm-${code}`
        script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(code)}`
        document.head.appendChild(script)
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })
    })

    function gtag(..._args: unknown[]) {
        // gtag.js expects the arguments object itself, not an array
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments)
    }

    // gtag.js needs an ID in its URL to load the tag; the others are added by config below.
    // Google 404s an ID it doesn't recognise and the library never loads, which would stop
    // every ID from tracking, so fall back to the next ID.
    const loadGtag = (index = 0) => {
        const code = tagCodes[index]
        if (!code) return
        const script = document.createElement('script')
        script.async = true
        script.id = 'gtag'
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(code)}`
        script.onerror = () => {
            script.remove()
            loadGtag(index + 1)
        }
        document.head.appendChild(script)
    }

    if (tagCodes.length) {
        if (!document.getElementById('gtag')) {
            loadGtag()
        }

        gtag('js', new Date())
        tagCodes.forEach(code => gtag('config', code))
    }

    return {
        provide: {
            gtag
        }
    }
})
