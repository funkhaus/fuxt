import SITE_SETTINGS from "~/gql/queries/SiteSettings.gql"
import _get from "lodash/get"

// Define State defaults
export const state = () => ({
    siteMeta: {},
    menuOpened: false,
    breakpoint: "desktop",
    sTop: 0,
    winHeight: 0,
    winWidth: 0,
    isLoading: false,
    referrer: false,
})

// Define mutations
export const mutations = {
    SET_BREAKPOINT(state, breakpoint) {
        state.breakpoint = breakpoint
    },
    SET_MENU(state, data) {
        state.menuOpened = data
    },
    SET_S_TOP(state, pos) {
        state.sTop = pos
    },
    SET_WIN_DIMENSIONS(state, dimensions) {
        state.winHeight = dimensions.height
        state.winWidth = dimensions.width
    },
    SET_SITE_META(state, data) {
        state.siteMeta = data
    },
    SET_LOADING(state, data) {
        state.isLoading = data
    },
    SET_REFERRER(state, object) {
        state.referrer = object
    },
}

// Define actions
export const actions = {
    async nuxtServerInit(store, context) {
        // Make all requests in parallel
        const data = await Promise.all([
            store.dispatch("QUERY_SETTINGS", context),
            //store.dispatch("ANOTHER_ACTION_EXAMPLE", context)
        ])
    },

    async QUERY_SETTINGS({ dispatch, commit }, context) {
        // Get site settings from WordPress and save them to store
        try {
            const data = await this.$graphql.request(SITE_SETTINGS)
            const options = _get(data, "acfSettings.acfSiteOptions", {})

            // Get and shape general settings
            const settings = _get(data, "wpSettings", {})
            let meta = {
                title: settings.title,
                description: settings.description,
                themeScreenshotUrl: settings.themeScreenshotUrl,
                backendUrl: settings.backendUrl,
                frontendUrl: settings.frontendUrl,
            }

            // Get ACF site settings, shape them correctly
            if (options.googleAnalytics) {
                meta.gaTrackingCodes = options.googleAnalytics.map((item) => {
                    return item.code
                })
                delete options.googleAnalytics
            }

            commit("SET_SITE_META", { ...meta, ...options })

            return data
        } catch (e) {
            throw new Error(e)
        }
    },
}
