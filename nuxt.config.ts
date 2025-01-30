// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    // Modules and configuration
    modules: [
        '@pinia/nuxt',
        'nuxt-svgo',
        '@nuxt/fonts',
        '@nuxtjs/storybook',
        '@nuxtjs/sitemap',
        '@vueuse/nuxt',
        'nuxt-lodash'
    ],
    devtools: {
        // This only ships on dev, it gets stripped in Production
        enabled: true
    },

    // Nuxt app configuration
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
        },
        pageTransition: {
            name: 'fade',
            mode: 'out-in'
        }
    },

    // CSS and fonts
    css: [
        '~/assets/css/vars.css',
        '~/assets/css/main.css',
        '~/assets/css/transitions.css'
    ],
    vue: {
        // Required for @nuxtjs/storybook
        runtimeCompiler: process.env.STORYBOOK === 'true'
    },

    // Runtime ENV parsing
    runtimeConfig: {
        public: {
            wordpressApiUrl: process.env.WORDPRESS_API_URL
        }
    },
    future: { compatibilityVersion: 4 },
    compatibilityDate: '2024-09-17',

    // Build configuration
    nitro: {
        routeRules: {
            // All routes should be ISR
            '/**': {
                isr: true
            }
        },
        prerender: {
            // This helps ensure that all paths end with `/`.
            autoSubfolderIndex: true,
            crawlLinks: true
        },
        compressPublicAssets: {
            gzip: true
        }
    },
    vite: {
        optimizeDeps: {
            // Used for v8.3.5 of Storybook. Can remove after update.
            // SEE https://github.com/nuxt-modules/storybook/issues/776
            include: ['jsdoc-type-pratt-parser']
        }
    },
    postcss: {
        plugins: {
            '@csstools/postcss-global-data': {
                files: ['./app/assets/css/media.css']
            },
            'postcss-nested': {},
            'postcss-custom-media': {}
        }
    },
    fonts: {
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
        },
        experimental: {
            // Must be enabled to support processing fonts as CSS vars
            processCSSVariables: true
        }
    },
    lodash: {
        prefix: '_',
        prefixSkip: []
    },

    server: {
        host: process.env.HOST || '0.0.0.0'
    },
    sitemap: {
        exclude: ['/wp-admin/']
    },
    svgo: {
        autoImportPath: './assets/svgs/',
        defaultImport: 'component',
        componentPrefix: 'svg',
        global: false
    }
})
