export default {
    target: "static",
    components: true,

    /*
     ** Headers of the page
     */
    head: {
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
        script: [
            {
                src: "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,smoothscroll&flags=gated",
                body: true
            }
        ]
    },

    /*
     ** Default transition for all pages
     */
    pageTransition: {
        name: "fade",
        mode: ""
    },

    /*
     ** Customize the progress-bar color
     ** See: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
     */
    loading: {
        color: "#000000",
        height: "3px"
    },

    /*
     ** Global CSS
     */
    css: [
        "~/styles/global.scss",
        "~/styles/transitions.scss",
        "~/styles/variables-css.scss",
        "~/styles/themes.scss"
        //"~/styles/fonts.css" // Be sure to turn on the font loader plugin and config it
    ],

    /*
     ** SCSS that is injected into every component
     */
    styleResources: {
        scss: ["~/styles/media-queries.scss"]
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/devtools.client.js", mode: "client" },
        { src: "~/plugins/global-directive-loader.js" },
        { src: "~/plugins/google-gtag.client.js", mode: "client" },
        { src: "~/plugins/preview.client.js", mode: "client" },
        { src: "~/plugins/performant-events.client.js", mode: "client" }
        //{ src: "~/plugins/web-font-loader.client.js", mode: "client" },
        //{ src: "~/plugins/ip-geolocate.js" },
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        "~/modules/populate",
        "@nuxtjs/sitemap"
        // [
        //     "nuxt-vuex-localstorage",
        //     {
        //         localStorage: ["geolocation"],
        //         mode: "debug",
        //     },
        // ],
    ],

    /*
     ** Enable to use ip-geolocate plugin
     */
    // publicRuntimeConfig: {
    //     ipStackKey: process.env.IPSTACK_KEY,
    // },

    /*
     * Build modules
     */
    buildModules: [
        "@nuxtjs/style-resources",
        "nuxt-graphql-request",
        "~/modules/sitemap-route-generator"
    ],

    /*
     ** GraphQL Request options.
     ** See: https://github.com/Gomah/nuxt-graphql-request
     */
    graphql: {
        clients: {
            default: {
                endpoint: process.env.GQL_ENDPOINT,
                options: {
                    credentials: "include",
                    mode: "cors"
                }
            }
        }
    },

    /*
     ** Customize router
     */
    router: {
        linkExactActiveClass: "exact-active-link",
        linkActiveClass: "active-link",
        middleware: ["referrer"],
        prefetchLinks: true,
        linkPrefetchedClass: "link-prefetched",
        trailingSlash: true
    },

    /*
     ** Server side middleware
     */
    serverMiddleware: [
        { handler: "~/server-middleware/redirect-trailing-slash.js" }
        // { handler: "~/server-middleware/preview-ssr.js" },
    ],

    /*
     ** Build configuration
     */
    build: {
        extend(config, ctx) {
            // Remove SVG from default Nuxt webpack rules
            const svgRule = config.module.rules.find((rule) =>
                rule.test.test(".svg")
            )
            svgRule.test = /\.(png|jpe?g|gif|webp)$/i

            // Use SVG loader for .svg files
            config.resolve.extensions.push(".svg")
            config.module.rules.push({
                test: /\.svg$/,
                oneOf: [
                    {
                        // ?raw on import will give raw SVG with no optimizations.
                        // Good if you need unaltered SVGs for animations.
                        resourceQuery: /raw/,
                        use: [
                            "babel-loader",
                            {
                                loader: "vue-svg-loader",
                                options: {
                                    svgo: false
                                }
                            }
                        ]
                    },
                    {
                        // ?url on import will give base64 encode SVG.
                        // Good for use in CSS.
                        resourceQuery: /url/,
                        use: ["url-loader"]
                    },
                    {
                        // Default SVG loader.
                        loader: "vue-svg-loader",
                        options: {
                            svgo: {
                                plugins: [{ removeViewBox: false }]
                            }
                        }
                    }
                ]
            })
        },
        html: {
            // These settings make Netlify build times much faster.
            // SEE https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#htmlminify
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: false,
                minifyJS: false,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true
            }
        }
    },

    /*
     ** Nuxt generate configuration. Used when generating a static site.
     */
    generate: {
        fallback: "404.html",
        interval: 500,
        concurrency: 100
    },

    /*
     ** Setup for the Sitemap module.
     ** You can see output at /sitemap.xml
     ** SEE https://github.com/nuxt-community/sitemap-module
     */
    sitemap: {
        // If you are NOT using Netlify to host, you need to set the hostname
        hostname: process.env.URL || "http://localhost:3000",
        filter({ routes }) {
            // Don't allow these paths to show in sitemap.
            // Add anything you want to hide from the sitemap
            const excludedPaths = ["/wp-admin/"]
            return routes.filter((route) => {
                return !excludedPaths.includes(route.url)
            })
        }
    },

    /*
     ** Allow devices on local network to view the site at {your IP}:3000
     */
    server: {
        host: process.env.HOST || "0.0.0.0"
    },

    /*
     ** Storybook
     ** SEE https://storybook.nuxtjs.org/options
     */
    storybook: {
        stories: ["~/stories/**/*.stories.js"],
        parameters: {
            layout: "fullscreen",
            backgrounds: {
                default: "default",
                values: [
                    {
                        name: "default",
                        value: "#ffffff"
                    },
                    {
                        name: "black",
                        value: "#000000"
                    }
                ]
            }
        },
        webpackFinal(config, { configDir }) {
            // Allow webpack to auto-load .gql and .svg files
            config.resolve.extensions.push(".gql", ".svg")

            return config
        }
    }
}
