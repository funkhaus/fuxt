import _get from "lodash/get"

export default ({ store, app: { router, context } }, inject) => {
    // Remove any empty tracking codes
    let codes = _get(store, "state.siteMeta.gaTrackingCodes", [])
    codes = codes.filter(Boolean)

    // Abort if no codes
    if (!codes.length) {
        if (context.isDev) console.log("No Google Anlaytics tracking codes set")
        return
    }

    // Abort if in Dev mode, but inject dummy functions so $gtag events don't throw errors
    if (context.isDev) {
        inject("gtag", () => {})
        return
    }

    // Abort if we already added script to head
    let gtagScript = document.getElementById("gtag")
    if (gtagScript) {
        return
    }

    // Add script tag to head
    let script = document.createElement("script")
    script.async = true
    script.id = "gtag"
    script.src = "//www.googletagmanager.com/gtag/js"
    document.head.appendChild(script)

    // Include Google gtag code and inject it (so this.$gtag works in pages/components)
    window.dataLayer = window.dataLayer || []
    function gtag() {
        dataLayer.push(arguments)
    }
    inject("gtag", gtag)
    gtag("js", new Date())

    // Add tracking codes from Vuex store
    codes.forEach(code => {
        gtag("config", code, {
            send_page_view: false // Necessary to avoid duplicated page track on first page load
        })

        // After each router transition, log page event to Google for each code
        router.afterEach(to => {
            gtag("config", code, { page_path: to.fullPath })
        })
    })
}
