// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-09-17',

    // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
    future: { compatibilityVersion: 4 },

    devtools: { enabled: true },

    nitro: {
    // https://github.com/danielroe/nuxt-vercel-isr
        routeRules: {
            // all routes
            '/**': {
                isr: true
            }
        }
    },
    app: {
        head: {
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                }
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/favicon.png'
                }
            ]
        }
    },

    runtimeConfig: {
        public: {
            wordpressApiUrl: process.env.WORDPRESS_API_URL
        }
    },

    // required for @nuxtjs/storybook
    vue: {
        runtimeCompiler: true
    },

    css: [
        '~/assets/css/media.css',
        '~/assets/css/vars.css',
        '~/assets/css/main.css'
    ],

    modules: [
        '@nuxt/fonts',
        '@pinia/nuxt',
        '@nuxtjs/storybook',
        '@nuxtjs/sitemap',
        '@vueuse/nuxt'
    ],

    site: {
        url: 'https://nuxt.com',
        name: 'Nuxt Example'
    },

    sitemap: {
        exclude: []
    },

    fonts: {
        // families: [
        //     {
        //         name: 'CalibreWeb-Light',
        //         src: '/fonts/CalibreWeb-Light.woff',
        //         fallbacks: [
        //             'sans-serif'
        //         ],
        //         weights: ['300'],
        //         styles: ['normal'],
        //         display: 'swap'
        //     }
        // ]
        // adobe: {
        //     id: [
        //         'twu5pcy'
        //     ]
        // }

    },

    postcss: {
        plugins: {
            'postcss-nested': {},
            'postcss-custom-media': {}
        }
    }
})
