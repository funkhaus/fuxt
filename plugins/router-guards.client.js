export default ({ app, store }) => {
    if (process.server) {
        return
    }
    app.router.beforeEach(() => {
        store.commit("SET_ROUTING", true)
        next()
    })
    app.router.afterEach(() => {
        store.commit("SET_ROUTING", false)
    })
}
