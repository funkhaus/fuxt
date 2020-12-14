import _get from "lodash/get"

export default async ({ store, req, query, isDev }) => {
    // Abort if no API key set
    if (!process.env.IPSTACK_KEY) {
        console.error(
            "You must set IPSTACK_KEY as an environment variable to use IP detection."
        )
        return
    }

    let location = {
        ip: "",
        detectedCountry: _get(store, "state.geolocation.detectedCountry", ""),
    }
    let endpoint = "check"

    // Abort if we already have a country
    if (location.detectedCountry) {
        return
    }

    // If this is running server side (and not static generation), get users country and IP from server headers if possible
    if (process.server && !process.static) {
        const headers = req.headers

        location.detectedCountry =
            headers["cf-ipcountry"] || headers["Cf-Ipcountry"] || ""

        location.ip =
            headers["cf-connecting-ip"] ||
            headers["CF-Connecting-IP"] ||
            headers["x-forwarded-for"] ||
            headers["X-Forwarded-For"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            ""

        // Replace endpoint with IP, and make sure to get first IP in case given multiples
        endpoint = location.ip.split(",")[0]
    }

    // Allow manual IP override for testing
    // 93.37.80.33 is in Italy and 72.229.28.185 is in US
    if (query.ip) {
        endpoint = query.ip
    }

    // Hit the IP Stack API if no country known yet
    // If we get client side, and still no country, then try again
    // This logic is to protect agaisnt running during static generation build
    if (isDev || (!location.detectedCountry && process.target !== "static")) {
        // SEE for more options: https://ipstack.com/documentation/#requester
        const res = await fetch(
            `https://api.ipstack.com/${endpoint}?access_key=${process.env.IPSTACK_KEY}&fields=country_code,ip`,
            { credentials: "omit" }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("IP Stack error:", data.error.info)
                }

                return {
                    detectedCountry: data.country_code || "",
                    ip: data.ip || "",
                }
            })
            .catch((error) => {
                console.error("IP Stack error:", error)

                return {
                    detectedCountry: "",
                    ip: "",
                }
            })

        location = { ...res }
    }

    // Commit to store
    store.commit("geolocation/SET_GEOLOCATION", {
        ip: location.ip || "",
        detectedCountry: location.detectedCountry || "",
        userCountry: "",
    })
}
