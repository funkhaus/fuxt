import pkg from "./package"

export default {
    mode: "universal",

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
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
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
        "nuxt-basic-auth-module"
    ],

    /*
     ** Load scss globally via styleResources
     */
    styleResources: {
        scss: ["~/styles/_vars.scss"]
    },

    /*
     ** Apollo options. Used for Graph QL queries
     ** See: https://www.apollographql.com/docs/link/links/http.html#options
     */
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint:
                    "http://stackhaus-backend.flywheelsites.com/graphql",
                tokenName: "apollo-token",
                persisting: false,
                websocketsOnly: false
            }
        }
    },

    /*
     ** Customize router
     */
    router: {
        linkExactActiveClass: "exact-active-link",
        linkActiveClass: "active-link"
        // Example to override router functionality
        //     extendRoutes (routes, resolve) {
        //     routes.push({
        //       name: '404',
        //       path: '*',
        //       component: resolve(__dirname, 'pages/404.vue')
        //     })
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
        }
    },

    /*
     ** Basic (htaccess) authentication configuration
     */
    basic: {
        name: "funkhaus",
        pass: "12345", // https://youtu.be/a6iW-8xPw3k
        enabled: false
    }
}
