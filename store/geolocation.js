/*
 * NOTE Often times you'll want to remeber IP detects locally for the user.
 * Use this to do that: https://github.com/rubystarashe/nuxt-vuex-localstorage
 */

// Define state default
export const state = () => ({
    ip: "",
    detectedCountry: "",
    userCountry: "", // This is where you would set the user defined country (like on button click)
    version: 2, // Used by nuxt-vuex-localstorage
})

// Define mutations
export const mutations = {
    SET_GEOLOCATION(state, data) {
        // If a contry code provided, then just set the user defined country
        if (typeof data === "string") {
            state.userCountry = data
        } else {
            // Else set entire geolocation object
            state.ip = data.ip || state.ip
            state.detectedCountry =
                data.detectedCountry || state.detectedCountry
            state.userCountry = data.userCountry || state.userCountry
        }
    },
}

// Getters
export const getters = {
    // Convert conutry to a custom region
    // NOTE You can access this getter using this syntax: this.$store.getters["geolocation/region"]
    region(state) {
        // If we have user set a contry, assum it is the region and then use that.
        if (state.userCountry) {
            return state.userCountry
        }

        // Default region
        let region = "America"

        // Other regions (should expand these regions and country codes as needed)
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
