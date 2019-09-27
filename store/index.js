import config from "~/nuxt.config"
import WpSettings from "~/gql/queries/WpSettings.gql"
import _get from "lodash/get"

// Define State defaults
export const state = () => ({
    siteMeta: {},
    menuOpened: false,
    breakpoint: "desktop",
    sTop: 0,
    winHeight: 0,
    winWidth: 0
})

// Define mutations
export const mutations = {
    SET_BREAKPOINT(state, breakpoint) {
        state.breakpoint = breakpoint
    },
    OPEN_MENU(state) {
        state.menuOpened = true
    },
    CLOSE_MENU(state) {
        state.menuOpened = false
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
    }
}

// Define actions
export const actions = {
    async nuxtServerInit(store, context) {
        // Set default breakpoint
        if (context.isMobileOrTablet) {
            store.commit("SET_BREAKPOINT", "mobile")
        }

        // Define menus here.
        // Use menu location, as definded in WordPress functions/theme-config.php
        // WordPress saves them as UPPERCASE_WITH_UNDERSCORES_FOR_SPACES always
        // let menuLocations = ["MAIN_MENU"]

        // Make all requests in parallel
        const data = await Promise.all([
            store.dispatch("QUERY_SETTINGS")
            //store.dispatch("menus/QUERY_MENUS", menuLocations)
        ])
    },

    async QUERY_SETTINGS(store, context) {
        // Get backend API
        const apiUrl = _get(
            config,
            "apollo.clientConfigs.default.httpEndpoint",
            ""
        ).replace("/graphql", "")

        // Get site settings from WordPress and save them to store
        let client = this.app.apolloProvider.defaultClient
        await client
            .query({
                query: WpSettings
            })
            .then(({ data }) => {
                let settings = _get(data, "generalSettings", {})
                let meta = {
                    title: settings.title,
                    host: context.req.headers.host,
                    description: settings.description,
                    themeScreenshotUrl: settings.themeScreenshotUrl,
                    apiUrl: apiUrl,
                    gaTrackingCodes: [
                        settings.gaTrackingCode1,
                        settings.gaTrackingCode2
                    ]
                }
                store.commit("SET_SITE_META", meta)
            })
    }
}
