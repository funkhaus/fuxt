import _get from "lodash/get"
import _camelCase from "lodash/camelCase"
import MenuByLocation from "~/queries/MenuByLocation.gql"

// Define State defaults
export const state = () => ({
    locations: {}
})

// Define mutations
export const mutations = {
    SET_MENU(state, data) {
        state.locations = { ...state.locations, [data.location]: data.items }
    }
}

// Define actions
export const actions = {
    async QUERY_MENUS({ commit }, menuLocations) {
        let client = this.app.apolloProvider.defaultClient

        // Get each menu from server
        for (const location of menuLocations) {
            const query = await client.query({
                query: MenuByLocation,
                variables: {
                    location: location
                }
            })

            // Commit menu to store
            commit("SET_MENU", {
                location: _camelCase(location),
                items: await _get(query, "data.menuItems.nodes", {})
            })
        }
    }
}
