import _get from "lodash/get"
import _camelCase from "lodash/camelCase"
import MenuByLocation from "~/gql/queries/MenuByLocation.gql"

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
        let queries = []

        // Build the query for each menu location passed in
        for (const location of menuLocations) {
            let query = client.query({
                query: MenuByLocation,
                variables: {
                    location: location
                }
            })
            queries.push(query)
        }

        // Send all requests in parallel and then commit each menu to store as it comes back
        const allResponses = await Promise.all(queries)
        for (const [index, response] of allResponses.entries()) {
            commit("SET_MENU", {
                location: _camelCase(menuLocations[index]),
                items: _get(response, "data.menuItems.nodes", {})
            })
        }
    }
}
