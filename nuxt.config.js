require("dotenv").config()
import pkg from "./package"

export default {
    mode: "universal",
    env: {
        ...process.env,
    },

    /*
     ** Headers of the page
     */
    head: {
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
        script: [
            {
                src:
                    "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,smoothscroll&flags=gated",
                body: true,
            },
        ],
    },

    /*
     ** Default transition for all pages
     */
    pageTransition: {
        name: "fade",
        mode: "out-in",
    },

    /*
     ** Customize the progress-bar color
     ** See: https://nuxtjs.org/api/configuration-loading#use-a-custom-loading-component
     */
    loading: {},

    /*
     ** Global CSS
     */
    css: [
        "~/styles/global.scss",
        "~/styles/transitions.scss",
        //'~/styles/fonts.css'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/global-component-loader.js" },
        { src: "~/plugins/global-directive-loader.js" },
        { src: "~/plugins/google-gtag.client.js", mode: "client" },
        //{ src: "~/plugins/web-font-loader.client.js", mode: "client" }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        "nuxt-graphql-request",
        "@nuxtjs/style-resources",
        "nuxt-basic-auth-module",
        "@nuxtjs/device",
    ],

    /*
     * Build modules
     */
    buildModules: ["@nuxtjs/dotenv"],

    /*
     ** Load SCSS into each component
     */
    styleResources: {
        scss: ["~/styles/variables.scss", "~/styles/mixins.scss"],
    },

    /*
     ** GraphQL Request options.
     ** See: https://github.com/Gomah/nuxt-graphql-request
     */
    graphql: {
        AST: true,
        endpoint: process.env.DEFAULT_ENDPOINT,
        options: {
            credentials: "include",
            mode: "cors",
            headers: {
                authorization: `Bearer ${process.env.BASIC_API_TOKEN || ""}`,
            },
        },
    },

    /*
     ** Customize router
     */
    router: {
        linkExactActiveClass: "exact-active-link",
        linkActiveClass: "active-link",
        middleware: ["referrer", "preview-redirect"],
        prefetchLinks: true,
        linkPrefetchedClass: "link-prefetched",
        trailingSlash: true,
    },

    /*
     ** Server side middleware
     */
    serverMiddleware: [
        "~/middleware/preview-spa-mode.server.js",
        "~/middleware/redirect-trailing-slash.server.js",
    ],

    /*
     ** Build configuration
     */
    build: {
        // This and the transpile code below fix an issue with the spread operator in Safari 10.
        babel: {
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
        },
        transpile: ["ky", "vuex"],
        extend(config, ctx) {
            // Includes the Compiler version of Vue.
            // If you don't use the <wp-content> component, then you can delete this safely.
            config.resolve.alias["vue$"] = "vue/dist/vue.esm.js"

            // This stops a @nuxtjs/dotenv error.
            config.node = { fs: "empty" }

            // Remove SVG from default Nuxt webpack rules
            const svgRule = config.module.rules.find((rule) =>
                rule.test.test(".svg")
            )
            svgRule.test = /\.(png|jpe?g|gif|webp)$/i

            // Use SVG loader for .svg files
            config.resolve.extensions.push(".svg")
            config.module.rules.push({
                test: /\.svg$/,
                use: [
                    "babel-loader",
                    {
                        loader: "vue-svg-loader",
                        options: {
                            svgo: {
                                plugins: [{ removeViewBox: false }],
                            },
                        },
                    },
                ],
            })
        },
    },

    /*
     ** Basic (htaccess) authentication configuration
     */
    basic: {
        name: "funkhaus",
        pass: "12345", // https://youtu.be/a6iW-8xPw3k
        enabled: process.env.BASIC_AUTH_ENABLED === "true",
    },

    /*
     ** Allow devices on local network to view the site at {your IP}:3000
     */
    server: {
        host: process.env.HOST || "0.0.0.0",
    },

    /*
     ** Storybook
     ** SEE https://storybook.nuxtjs.org/options
     */
    storybook: {
        stories: ["~/stories/**/*.stories.js"],
        webpackFinal(config, { configDir }) {
            // Allow webpack to auto-load .gql files
            config.resolve.extensions.push(".gql")

            return config
        },
    },
}
