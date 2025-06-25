/**
 * This function builds out a Vimeo iFrame embed URL
 *
 * @param {string} url - The url to the Vimeo or YouTube page, eg: https://vimeo.com/20744468/12345678 or https://vimeo.com/20744468 or https://www.youtube.com/watch?v=zAGu2TPt_78
 * @param {Record<string, any>} options - Object of optional embed parameters.
 * @returns {string}
 */
function buildVideoEmbedUrl(url: string = '', options: Record<string, any> = {}): string {
    let output: string = url

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
 * @param {Record<string, any>} options - Optional Vimeo embed parameter options.
 * @returns {string}
 */
const buildVimeoUrl = (url: string = '', options: Record<string, any> = {}): string => {
    const defaults: Record<string, any> = {
        byline: 0,
        portrait: 0,
        autoplay: 1,
        color: 'ffffff',
        controls: 1,
        playsinline: 1,
        api: 1,
        dnt: 0,
        title: 0,
        autopause: 1
    }
    const parameters: Record<string, any> = { ...defaults, ...options }

    const parsedUrl = new URL(url)
    parsedUrl.search = ''
    parsedUrl.hostname = 'player.vimeo.com'

    const paths = parsedUrl.pathname.split('/').filter(Boolean)
    parsedUrl.pathname = `/video/${paths[0] || ''}`

    if (paths[1]) {
        parsedUrl.searchParams.set('h', paths[1])
    }

    return setUrlParameters(parsedUrl, parameters).toString()
}


/**
 * Convert a YouTube video page URL into an iFrame embed URL
 *
 * @param {string} url - YouTube video page URL
 * @param {Record<string, any>} options - Optional YouTube embed parameter options.
 * @returns {string}
 */
const buildYouTubeUrl = (url: string, options: Record<string, any>): string => {
    // Set defaults and merge with provided options
    const defaults: Record<string, any> = {
        rel: 0,
        autoplay: 1,
        color: 'ffffff',
        controls: 1,
        playsinline: 1,
        enablejsapi: 1,
        modestbranding: 1,
        loop: 0
    }
    const parameters: Record<string, any> = { ...defaults, ...options }

    // Get YouTube ID
    const youTubeId: string = getYouTubeId(url)

    // Parse URL, remove any query params
    const parsedUrl = new URL(url)
    parsedUrl.search = ''

      // Set ID
    parsedUrl.pathname = `/embed/${youTubeId}`

     // Add all options as query params to URL
    return setUrlParameters(parsedUrl, parameters)
        .toString()
        .replace('https://youtu.be/', 'https://www.youtube.com/')
}

/**
 * Function to add an object of URL parameters to a URL
 *
 * @param {URL} url - A URL interface object
 * @param {Record<string, any>} parameters - Object of URL parameter key:value pairs
 * @returns {URL} - A URL interface with updated parameters
 */
const setUrlParameters = (url: URL, parameters: Record<string, any> = {}): URL => {
    Object.entries(parameters).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
            url.searchParams.set(key, Number(value).toString())
        }
        else {
            url.searchParams.set(key, String(value))
        }
    })

    return url
}

/**
 * Tests a URL string for Vimeo
 * @param {string} url
 * @returns {boolean}
 */
const isVimeo = (url: string = ''): boolean => url.includes('vimeo.com')

/**
 * Tests a URL string for YouTube
 * @param {string} url
 * @returns {boolean}
 */
const isYouTube = (url: string = ''): boolean => url.includes('youtube.com') || url.includes('youtu.be')


/**
 * Gets a YouTube ID from a URL string
 * @param {string} url
 * @returns {string}
 */
const getYouTubeId = (url: string = ''): string => {
    const regex = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/
    const matches = url.match(regex)
    return matches ? matches[1] : ''
}

export default buildVideoEmbedUrl
