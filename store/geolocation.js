/*
 * Often times you'll want to remeber IP detects locally for the user.
 * Use this to do that: https://github.com/rubystarashe/nuxt-vuex-localstorage
 */

// Define state default
export const state = () => ({
    ip: "",
    detectedCountry: "",
    userCountry: "", // This is where you would set the user defined country (like on button click)
    version: 1, // Used by nuxt-vuex-localstorage
})

// Define mutations
export const mutations = {
    SET_GEOLOCATION(state, data) {
        // If a contry code provided, then just set the user defined contry
        if (typeof data === "string") {
            state = {
                ...state,
                userCountry: data,
            }
        } else {
            // Else set entire geolocation object
            state.ip = data.ip || state.ip
            state.detectedCountry =
                data.detectedCountry || state.detectedCountry
            state.userCountry = data.userCountry || state.userCountry
        }
    },
}
