/*
 * NOTE Often times you'll want to remeber IP detects locally for the user.
 * Use this to do that: https://github.com/rubystarashe/nuxt-vuex-localstorage
 */

// Define state default
export const state = () => ({
    ip: "",
    detectedCountry: "",
    userRegion: "", // This is where you would set the user defined country (like on button click)
    version: 1, // Used by nuxt-vuex-localstorage to reset all users location
})

// Define mutations
export const mutations = {
    SET_GEOLOCATION(state, data) {
        // If a contry code provided, then just set the user defined country
        if (typeof data === "string") {
            state.userRegion = data
        } else {
            // Else set entire geolocation object
            state.ip = data.ip || state.ip
            state.detectedCountry =
                data.detectedCountry || state.detectedCountry
            state.userRegion = data.userRegion || state.userRegion
        }
    },
}

// Getters
export const getters = {
    // Convert country code to a custom region
    // NOTE You can access this getter using this syntax: this.$store.getters["geolocation/region"]
    region(state) {
        // If we have user set a country, assume it is the region and then use that.
        if (state.userRegion) {
            return state.userRegion
        }

        // Default region
        let region = "America"

        // Other regions (should expand these regions and country codes as needed)
        // SEE all two letter country codes here: https://www.iban.com/country-codes
        const europeRegion = ["UK"]
        const asiaRegion = ["JP"]

        switch (true) {
            case europeRegion.includes(state.detectedCountry):
                region = "Europe"
                break

            case asiaRegion.includes(state.detectedCountry):
                region = "Asia"
                break
        }

        return region
    },
}
