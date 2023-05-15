/**
 * This function builds out a Vimeo iFrame embed URL
 *
 * @param {string} url - The url to the Vimeo or YouTube page, eg: https://vimeo.com/20744468/12345678 or https://vimeo.com/20744468 or https://www.youtube.com/watch?v=zAGu2TPt_78
 * @param {Object} options - Object of optional embed parameters.
 * @returns {string}
 */
function buildVideoEmbedUrl(url = "", options = {}) {
    let output = url

    switch (true) {
        case isVimeo(url):
            output = buildVimeoUrl(url, options)
            break

        case isYouTube(url):
            output = buildYouTubeUrl(url, options)
            break
    }

    return output
}

/**
 * Convert a Vimeo video page URL into an iFrame embed URL
 *
 * @param {string} url - Vimeo video page URL
 * @param {Object} options - Optional Vimeo embed parameter options.
 * @see https://help.vimeo.com/hc/en-us/articles/12426260232977-Player-parameters-overview
 * @returns {string}
 */
function buildVimeoUrl(url = "", options = {}) {
    // Set defaults and merge with provided options
    let defaults = {
        byline: 0,
        portrait: 0,
        autoplay: 1,
        color: "ffffff",
        controls: 1,
        playsinline: 1,
        api: 1,
        dnt: 0,
        portrait: 0,
        title: 0,
        autopause: 1
    }
    let parameters = { ...defaults, ...options }

    // Parse URL, set new player hostname
    url = new URL(url)
    url.hostname = "player.vimeo.com"

    // Get Video ID and Privacy Hash from paths
    let paths = url.pathname.split("/")
    paths = paths.filter(Boolean)

    // Set ID
    url.pathname = `/video/${paths[0] || ""}`

    // Set privacy hash
    if (paths[1]) {
        url.searchParams.set("h", paths[1])
    }

    // Add all options as query params to URL
    url = setUrlParameters(url, parameters)

    return url.toString()
}

/**
 * Convert a YouTube video page URL into an iFrame embed URL
 *
 * @param {string} url - YouTube video page URL
 * @param {Object} options - Optional YouTube embed parameter options.
 * @see https://developers.google.com/youtube/player_parameters
 * @returns {string}
 */
function buildYouTubeUrl(url, options) {
    // Set defaults and merge with provided options
    let defaults = {
        rel: 0,
        autoplay: 1,
        color: "ffffff",
        controls: 1,
        playsinline: 1,
        enablejsapi: 1,
        modestbranding: 1,
        loop: 0
    }
    let parameters = { ...defaults, ...options }

    // Get YouTube ID
    const youTubeId = getYouTubeId(url)

    // Parse URL, set new player hostname
    url = new URL(url)

    // Set ID
    url.pathname = `/embed/${youTubeId}`

    // Add all options as query params to URL
    url = setUrlParameters(url, parameters)

    return url.toString()
}

/**
 * Function to add an object of URL parameters to a URL
 *
 * @param {URL} url - A URL interface object
 * @param {Object} parameters - Object of URL parameter key:value pairs
 * @returns {URL} - A URL interface with updated parameters
 */
function setUrlParameters(url, parameters = {}) {
    Object.entries(parameters).forEach((entry) => {
        const [key, value] = entry

        // Cast a true/false to 1/0 to be URL friendly
        if (typeof value === "boolean") {
            url.searchParams.set(key, Number(value))
        } else {
            url.searchParams.set(key, value)
        }
    })

    return url
}

// Tests a URL string for Vimeo
function isVimeo(url = "") {
    return String(url).includes("vimeo.com")
}

// Tests a URL string for YouTube
function isYouTube(url = "") {
    return (
        String(url).includes("youtube.com") || String(url).includes("youtu.be")
    )
}

// Gets a YouTube ID from a URL string
function getYouTubeId(url = "") {
    // Regex to find the YouTube ID from these:
    // https://www.youtube.com/watch?v=wSX9F6ETTDQ
    // https://youtu.be/wSX9F6ETTDQ
    var regex = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/
    const matches = url.match(regex)
    return matches[1] || ""
}

export default buildVideoEmbedUrl
