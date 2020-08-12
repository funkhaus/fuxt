<script>
import cheerio from "cheerio"
import _kebabCase from "lodash/kebabCase"

export default {
    components: {
        shortcodeGallery: () => import("~/components/shortcode/Gallery"),
        shortcodeSvg: () => import("~/components/shortcode/Svg")
    },
    props: {
        html: {
            type: String,
            default: ""
        },
        fitVidsPlayers: {
            type: Array,
            default: () => [
                'iframe[src*="vimeo.com"]',
                'iframe[src*="youtube.com"]',
                'iframe[src*="soundcloud.com"]',
                "iframe.fit-vid"
            ]
        },
        unwrapSelector: {
            type: String,
            default: "p > iframe, p > img, p > .shortcode"
        },
        removeSelector: {
            type: String,
            default: "link, script, p:empty"
        },
        enableStyles: {
            type: Boolean,
            default: false
        }
    },
    head() {
        return {
            script: this.scripts
        }
    },
    data() {
        return {
            scripts: [],
            loadedScripts: []
        }
    },
    computed: {
        classes() {
            // Need to do this as a string becuase of render components
            let output = "wp-content " + this.loadedScripts.join(" ")
            if (this.enableStyles) {
                output = output + " has-styles"
            }
            return output
        },
        htmlTemplate() {
            // This is the main computed function that parses the HTML that ends up on the page

            // Abort if empty
            let output = this.html
            if (!output) {
                return output
            }

            // Strip tags (important to strip script tags here)
            output = this.removeElements(output, this.removeSelector)

            // Unwrap any elements
            output = this.unwrapElements(output, this.unwrapSelector)

            // Strip tags again (the unwrap method maybe left empty P tags)
            output = this.removeElements(output, this.removeSelector)

            // Setup fitVids on the HTML
            output = this.initFitVids(output)

            const $ = cheerio.load(output)
            output = $("body").html()

            return output
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.scripts = this.getScripts()
        })
    },
    updated() {
        this.$nextTick(() => {
            this.scripts = this.getScripts()
        })
    },
    methods: {
        getScripts() {
            let output = []

            // Abort if empty
            if (!this.html) {
                return output
            }

            const $ = cheerio.load(this.html)

            // Collect script tags so we can put them in head
            $("script").each((i, elem) => {
                // Get domain name using RegEx
                const parseUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
                const urlParts = parseUrl.exec(elem.attribs.src)
                const domain = urlParts[3]

                output[i] = {
                    src: elem.attribs.src,
                    hid: `embed-script-${domain}`,
                    defer: true,
                    async: true,
                    body: true,
                    callback: () => {
                        console.log("Loaded embedded script:", elem.attribs.src)
                        // Run any required JS callbacks for known embed scripts
                        switch (domain) {
                            case "www.instagram.com":
                                window.instgrm.Embeds.process()
                                break

                            case "connect.facebook.net":
                                FB.XFBML.parse()
                                break
                        }

                        this.loadedScripts.push(
                            _kebabCase(`embed-loaded-${domain}`)
                        )
                    }
                }
            })

            return output
        },
        wrapElements(html, selector, className = "wrapper") {
            // This will wrap all elements selected in a DIV with the provided class
            const $ = cheerio.load(html)
            $(selector).wrap(`<div class="${className}"></div>`)
            return $("body").html()
        },
        unwrapElements(html, selector) {
            // This will unwrap all elements selected from it's parent
            const $ = cheerio.load(html)

            $(selector).each(function() {
                $(this).insertAfter($(this).parent())
            })

            return $("body").html()
        },
        removeElements(html, selector) {
            // Removes any tags from the HTML
            const $ = cheerio.load(html)
            $(selector).remove()
            return $("body").html()
        },
        initFitVids(html) {
            const $ = cheerio.load(html)

            // Use intrinsic-ratio scaling of iFrame
            $(this.fitVidsPlayers)
                .not(".ignore-fit-vids")
                .each(function() {
                    const height = $(this).attr("height") || 9
                    const width = $(this).attr("width") || 16

                    // Wrap to allow better styling
                    $(this).wrap(
                        `<div class="fit-vid"><div class="responsive-video" style="padding-bottom: ${(height /
                            width) *
                            100}%"></div></div>`
                    )
                })

            return $("body").html()
        }
    },
    render(h) {
        return h({
            template: `<div class="${this.classes}">${this.htmlTemplate}</div>`
        })
    }
}
</script>

<style lang="scss" scoped>
.wp-content {
    /deep/ {
        .responsive-video {
            position: relative;

            iframe {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
            }
        }
    }

    &.has-styles {
        padding: 0 40px;

        /deep/ {
            .embed,
            .tiktok-embed,
            .twitter-tweet,
            .instagram-media,
            .fb_iframe_widget,
            .fit-vid {
                margin: 2em auto !important; // Wish we didn't have to do this, but some provides use inline margins
                max-width: 1280px;
                display: block;
                text-align: center;
            }
            p {
                max-width: 640px;
                margin-left: auto;
                margin-right: auto;
            }
            p:empty {
                display: none;
            }
            .fit-vid {
                max-width: 1800px;
                margin: 2em auto;
            }
            img {
                height: auto;
                width: 100%;
                max-width: 1800px;
                margin: 2em auto;
            }
        }
    }
}
</style>
