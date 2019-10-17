export default ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
        store.commit("SET_ROUTING", true)
        next()
    })
    app.router.afterEach(() => {
        store.commit("SET_ROUTING", false)
    })
}
