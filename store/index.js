export const state = () => ({
    menuOpened: false,
    breakpoint: ''
    //referral: ''
})

// Mutations
export const mutations = {
    SET_BREAKPOINT(state, breakpoint) {
        state.breakpoint = breakpoint
    },
    OPEN_MENU(state) {
        state.menuOpened = true
    },
    CLOSE_MENU(state) {
        state.menuOpened = false
    }
    // UPDATE_REFERRAL_ROUTE(state, referral) {
    //     state.referral = referral
    // }
}

// Actions
export const actions = {
    async nuxtServerInit(context, { req, app }) {
        // TODO Load menus into store here
    }
}
