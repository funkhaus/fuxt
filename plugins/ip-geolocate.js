export default async ({ store, req, query, isDev, $config }) => {
    // Set to true to check all users IPs. This is useful for debugging.
    const forceCheck = query.ip || false // DO NOT LEAVE TRUE AS IT WILL COST MONEY
    let endpoint = "check"

    // Give warning if forcing check to IP stack
    if (forceCheck) {
        console.warn(
            "IP Geolocate forceCheck is true. Please set to false once you finish testing."
        )
    }

    // Abort if no API key set
    if (!$config.ipStackKey) {
        console.error(
            "You must set IPSTACK_KEY as an environment variable to use IP detection."
        )
        return
    }

    let location = {
        ip: "",
        detectedCountry: store?.state?.geolocation?.detectedCountry || ""
    }

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
    // 93.37.80.33 is in Italy and 72.229.28.185 is in US and 101.167.187.25 is in the UK
    if (query.ip) {
        endpoint = query.ip
    }

    // Hit the IP Stack API if no country known yet
    // If we get client side, and still no country, then try again
    // This logic is to protect agaisnt running during static generation build
    const runCheck = process.client && !location.detectedCountry
    if (forceCheck || runCheck) {
        // SEE for more options: https://ipstack.com/documentation/#requester
        const res = await fetch(
            `https://api.ipstack.com/${endpoint}?access_key=${$config.ipStackKey}&fields=country_code,ip`,
            { credentials: "omit" }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("IP Stack error:", data.error.info)
                }

                return {
                    detectedCountry: data.country_code || "",
                    ip: data.ip || ""
                }
            })
            .catch((error) => {
                console.error("IP Stack error:", error)

                return {
                    detectedCountry: "",
                    ip: ""
                }
            })

        location = { ...res }
    }

    // Commit to store
    store.commit("geolocation/SET_GEOLOCATION", {
        ip: location.ip || "",
        detectedCountry: location.detectedCountry || "",
        selectedRegion: ""
    })
}
