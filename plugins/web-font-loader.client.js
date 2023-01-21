import WebFont from "webfontloader"

export default ({ store }) => {
    // See webfontloader docs here: https://github.com/typekit/webfontloader#modules
    WebFont.load({
        custom: {
            families: ["My Font"]
        },
        active() {
            store.commit("SET_FONTS_LOADED")
        }
    })
}
