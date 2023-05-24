import _isObject from "lodash/isObject"

/**
 * Make a fetch request, but proxy it through our custom WordPress API
 *
 * @param {string} name The API name that matches a Provider name set in WordPress Proxy Settings field group
 * @param {string} endpoint The API endpoint you wish to access. Not a complete URL, just the endpoint.
 * @param {Object} params An fetch params/options object. See: https://developer.mozilla.org/en-US/docs/Web/API/fetch
 * @returns {Promise} Promise contains JSON response from the fetch
 */
async function proxyFetch(name, endpoint, params) {
    // Set defaults and merge with provided options
    const defaults = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const parameters = { ...defaults, ...params }

    // Just to make better DX, lets auto JSON stringify the body
    if (params.body && _isObject(params.body)) {
        parameters.body = JSON.stringify(params.body)
    }

    // Add name and endpoint as custom headers so server knows where to proxy request
    parameters.headers = {
        ...parameters.headers,
        "Fuxt-Proxy-Name": name,
        "Fuxt-Proxy-Endpoint": endpoint
    }

    // Build WordPress Proxy API URL
    let proxyApi = process.env.PROXY_BASE_URL
    if (!proxyApi && process.env.GQL_ENDPOINT) {
        proxyApi = process.env.GQL_ENDPOINT.replace("/graphql", "")
    }

    // Make sure we remove trailing slash
    proxyApi = proxyApi.replace(/\/+$/g, "")

    const response = await fetch(
        `${proxyApi}/wp-json/fuxt/v1/proxy`,
        parameters
    )

    return await response.json()
}

export default proxyFetch
