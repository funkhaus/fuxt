import config from "~/nuxt.config"

// Define State defaults
export const state = () => ({
    menuOpened: false,
    breakpoint: "",
    apiUrl: "",
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
    SET_API(state, url) {
        state.apiUrl = url
    },
    SET_S_TOP(state, pos) {
        state.sTop = pos
    },
    SET_WIN_HEIGHT(state, height) {
        state.winHeight = height
    },
    SET_WIN_WIDTH(state, width) {
        state.winWidth = width
    }
}

// Define actions
export const actions = {
    async nuxtServerInit(store, context) {
        // Store backend API
        if (config.hasOwnProperty("apollo")) {
            store.commit(
                "SET_API",
                config.apollo.clientConfigs.default.httpEndpoint.replace(
                    "/graphql",
                    ""
                )
            )
        }

        // Define menus here.
        // Use menu location, as definded in WordPress functions/theme-config.php
        // WordPress saves them as UPPERCASE_WITH_UNDERSCORES_FOR_SPACES always
        // let menuLocations = ["MAIN_MENU"]
        // await store.dispatch("menus/QUERY_MENUS", menuLocations)
    }
}
