import _get from "lodash/get"

export default async ({ store }) => {
    const detectedCountry = _get(store, "state.geolocation.detectedCountry", "")

    // Abort if we have a country already
    if (detectedCountry) {
        return
    }

    // Hit the IP Stack API
    // SEE for more options: https://ipstack.com/documentation/#requester
    const {
        ip,
        detectedCountry,
    } = await fetch(
        `https://api.ipstack.com/check?access_key=${process.env.IPSTACK_KEY}&fields=country_code,ip`,
        { credentials: "omit" }
    )
        .then((response) => response.json())
        .then((data) => {
            return {
                detectedCountry: data.country_code,
                ip: data.ip,
            }
        })
        .catch((error) => {
            console.error("IP Stack fetch error:", error)
        })

    // Commit to store
    store.commit("geolocation/SET_GEOLOCATION", {
        ip: ip || "",
        detectedCountry: detectedCountry || "US",
        userCountry: "", // This is where you would set the user defined conntry (like on button click)
    })
}
