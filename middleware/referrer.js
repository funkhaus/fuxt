/*
 * This file saves the previous page route information to the store.
 * Useful for building back buttons 
 */
export default function({ store, from }) {
    if (process.client && from) {
        store.commit("SET_REFERRER", {
            name: from.name,
            fullPath: from.fullPath,
            path: from.path,
            query: from.query,
            params: from.params
        })
    }
}
