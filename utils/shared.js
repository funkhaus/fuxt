export const buildShareLinks = opts => {
    const url = opts.url || ""
    const text = opts.text.replace(/<[^>]*>?/gm, "") || ""

    const title = opts.title || ""

    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
        )}`,
        twitter: `http://twitter.com/share?text=${encodeURIComponent(
            text.substring(0, 280)
        )}&url=${encodeURIComponent(url)}`,
        tumblr: `http://www.tumblr.com/share/link?url=${encodeURIComponent(
            url
        )}`,
        reddit: `http://www.reddit.com/submit?url=${url}&title=${encodeURIComponent(
            title
        )}`,
        email: `mailto:?subject=${encodeURIComponent(
            title
        )}&body=${encodeURIComponent(text)}%0D%0A %0D%0A${encodeURIComponent(
            url
        )}`,
        linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            url
        )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
            text
        )}`,
        pinterest: `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
        )}&description=${encodeURIComponent(text)}`,
        reddit: `http://www.reddit.com/submit?url=${encodeURIComponent(url)}`
    }
}
