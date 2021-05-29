/*
 * This function is used generate the default meta tags for the <head>.
 * It's overridden by the wp-seo component most of the time.
 */
function metaDefaults({ $store, $route }) {
    return [
        {
            hid: "description",
            name: "description",
            property: "og:description",
            content: $store.state.siteMeta.description,
        },
        {
            hid: "og:image",
            property: "og:image",
            content: $store.state.siteMeta.themeScreenshotUrl,
        },
        {
            property: "og:url",
            content: `${$store.state.siteMeta.frontendUrl}${$route.path}`,
        },
        {
            property: "og:site_name",
            content: $store.state.siteMeta.title,
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            hid: "og:title",
            property: "og:title",
            content: $store.state.siteMeta.title,
        },
    ]
}
export default metaDefaults
