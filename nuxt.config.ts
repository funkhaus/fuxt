// WordPress root (the API URL minus /wp-json/...), for re-serving files Yoast generates at the WP root
const wordpressRoot = (process.env.WORDPRESS_API_URL || '').split('/wp-json')[0]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    // Modules and configuration
    modules: [
        '@pinia/nuxt',
        'nuxt-svgo',
        '@nuxt/fonts',
        '@nuxtjs/storybook',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
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
    // Sitemap URLs should match the canonicals, which WordPress builds with a trailing slash
    site: {
        trailingSlash: true
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
            },
            // Yoast's llms.txt links the WordPress sitemap filename; ours comes from @nuxtjs/sitemap
            '/sitemap_index.xml': {
                redirect: { to: '/sitemap.xml', statusCode: 301 }
            },
            // Re-serve the llms.txt Yoast generates at the WordPress root (Yoast → Settings → Site features).
            // Not ISR: a WordPress that is briefly unreachable must not pin a 404 for the whole ISR window.
            ...(wordpressRoot
                ? { '/llms.txt': { proxy: `${wordpressRoot}/llms.txt`, isr: false } }
                : {})
        },
        prerender: {
            // This helps ensure that all paths end with `/`.
            autoSubfolderIndex: true,
            crawlLinks: true,
            // A prerendered redirect becomes a static folder that shadows Netlify's _redirects
            ignore: ['/sitemap_index.xml']
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
        componentPrefix: 'svg'
    }
})
