// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-09-17',
    future: { compatibilityVersion: 4 },

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
            autoSubfolderIndex: true
        }
    },
    vite: {
        optimizeDeps: {
            // Used for v8.3.5 of Storybook. Can remove after update.
            // SEE https://github.com/nuxt-modules/storybook/issues/776
            include: ['jsdoc-type-pratt-parser']
        }
    },
    vue: {
        // Required for @nuxtjs/storybook
        runtimeCompiler: process.env.STORYBOOK === 'true'
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
        }
    },
    devtools: {
        // This only ships on dev, it gets stripped in Production
        enabled: true
    },

    // Runtime ENV parsing
    runtimeConfig: {
        public: {
            wordpressApiUrl: process.env.WORDPRESS_API_URL
        }
    },

    // CSS and fonts
    css: [
        '~/assets/css/vars.css',
        '~/assets/css/main.css'
    ],
    postcss: {
        plugins: {
            '@csstools/postcss-global-data': {
                files: ['./app/assets/css/media.css']
            },
            'postcss-nested': {},
            'postcss-custom-media': {}
        }
    },

    // Modules and configuration
    modules: [
        '@pinia/nuxt',
        'nuxt-svgo',
        '@nuxt/fonts',
        '@nuxtjs/storybook',
        '@nuxtjs/sitemap',
        '@vueuse/nuxt',
        'nuxt-lodash',
        '@nuxt/eslint',
    ],
    lodash: {
        prefix: '_',
        prefixSkip: []
    },
    sitemap: {
        exclude: ['/wp-admin/']
    },
    svgo: {
        autoImportPath: './assets/svgs/',
        defaultImport: 'component',
        componentPrefix: 'svg'
    },
    fonts: {
        experimental: {
            // Must be enabled to support processing fonts as CSS vars
            processCSSVariables: true
        }
    }
})
