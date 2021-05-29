import decodeHtmlEntities from "~/utils/decodeHtmlEntities"

/*
 * This function is used generate the page title.
 */
function titleTemplate({ $store }, titleChunk) {
    const title = decodeHtmlEntities(titleChunk)
    const site = decodeHtmlEntities($store.state.siteMeta.title)
    let output = site

    switch (true) {
        case site == title:
            output = site
            break

        case Boolean(title):
            output = `${site} - ${title}`
            break
    }

    return output
}

export default titleTemplate
