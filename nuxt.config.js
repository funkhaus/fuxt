require("dotenv").config()
import pkg from "./package"

export default {
    mode: "universal",
    env: {
        ...process.env
    },

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
                src:
                    "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,smoothscroll&flags=gated",
                body: true
            }
        ]
    },

    /*
     ** Default transition for all pages
     */
    pageTransition: {
        name: "fade",
        mode: "out-in"
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
        "~/styles/base.scss",
        "~/styles/transitions.scss"
        //'~/styles/fonts.css'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/global-component-loader.js" },
        { src: "~/plugins/global-directive-loader.js" },
        { src: "~/plugins/global-svg-loader.js" },
        { src: "~/plugins/google-gtag.client.js", mode: "client" }
        //{ src: "~/plugins/web-font-loader.client.js", mode: "client" }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        "@nuxtjs/apollo",
        "@nuxtjs/style-resources",
        "nuxt-basic-auth-module",
        "@nuxtjs/device"
    ],

    /*
     * Build modules
     */
    buildModules: ["@nuxtjs/dotenv"],

    /*
     ** Load scss globally via styleResources
     */
    styleResources: {
        scss: ["~/styles/vars.scss"]
    },

    /*
     ** Apollo options. Used for Graph QL queries
     ** See: https://github.com/nuxt-community/apollo-module#setup
     */
    apollo: {
        authenticationType: "Basic",
        clientConfigs: {
            default: "~/plugins/apollo-config-default.js"
        }
    },

    /*
     ** Customize router
     */
    router: {
        linkExactActiveClass: "exact-active-link",
        linkActiveClass: "active-link",
        middleware: ["referrer", "preview-redirect"],
        prefetchLinks: true,
        linkPrefetchedClass: "link-prefetched"
    },

    /*
     ** Build configuration
     */
    build: {
        // This and the transpile code below fix an issue with the spread operator in Safari 10.
        babel: {
            plugins: ["transform-object-rest-spread"]
        },
        transpile: ["ky", "vuex"],
        extend(config, ctx) {
            // This is used by plugins/global-svg-loader.js
            config.module.noParse = /\/assets\/svgs\/.+(svg$)/

            // Includes the Compiler version of Vue.
            // If you don't use the <wp-content> component, then you can delete this safely.
            config.resolve.alias["vue$"] = "vue/dist/vue.esm.js"

            // This stops a @nuxtjs/dotenv error.
            config.node = { fs: "empty" }
        }
    },

    /*
     ** Basic (htaccess) authentication configuration
     */
    basic: {
        name: "funkhaus",
        pass: "12345", // https://youtu.be/a6iW-8xPw3k
        enabled: process.env.BASIC_AUTH_ENABLED === "true"
    },

    /*
     ** Allow devices on local network to view the site at {your IP}:3000
     */
    server: {
        host: process.env.HOST || "0.0.0.0"
    }
}
