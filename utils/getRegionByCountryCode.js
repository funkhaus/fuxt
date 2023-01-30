/*
 * Add a trailing slash to end of a string always
 */
function getRegionByCountryCode(countryCode = "") {
    countryCode = countryCode.toUpperCase()

    // Default region
    let region = "us"

    // Other regions (should expand these regions and country codes as needed)
    // SEE all two letter country codes here: https://www.iban.com/country-codes
    const europeRegion = [
        "BE",
        "BG",
        "HR",
        "CY",
        "CZ",
        "DK",
        "EE",
        "ES",
        "FI",
        "FR",
        "DE",
        "GB",
        "GR",
        "HU",
        "IE",
        "IT",
        "LV",
        "LT",
        "LU",
        "MT",
        "NL",
        "PL",
        "PT",
        "RO",
        "SE",
        "SI",
        "SK"
    ]

    switch (true) {
        case europeRegion.includes(countryCode):
            region = "eu"
            break
    }

    return region
}

export default getRegionByCountryCode
