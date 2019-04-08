export const state = () => ({
    menuOpened: false,
    breakpoint: ''
    //referral: ''
})

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

// TODO Write action that will take a page object and set the nessesary data for OG
// TODO Wire up UPDATE_REFERRAL_ROUTE into router. Maybe this helps: https://github.com/funkhaus/vuehaus/blob/9adbf3cdcde3426455848fcce19f8f5d1d2c18c0/src/utils/router.js#L51-L77
