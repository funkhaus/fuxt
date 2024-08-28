// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

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

  runtimeConfig: {
    // accessible by server side only
    // API_URL: '',
    api: { url: '' },

    // exposed to the client side
    public: {
      // API_URL: '',
      // GEO_KEY: ''

      api: { url: '' },
      geo: { key: '' }
    }
  },

  // required for @nuxtjs/storybook
  vue: {
    runtimeCompiler: true
  },

  // css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxtjs/storybook',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: 'https://nuxt.com',
    name: 'Nuxt Example'
  },

  sitemap: {
    exclude: []
  },

  fonts: {
    families: [
      {
        name: 'CalibreWeb-Light',
        src: '/fonts/CalibreWeb-Light.woff',
        fallbacks: [
          'sans-serif'
        ],
        weights: ['300'],
        styles: ['normal'],
        display: 'swap'
      }
    ],

    adobe: {
      id: [
        'twu5pcy'
      ]
    }

  },

  postcss: {
    plugins: {
      // Installed By Default
      // 'autoprefixer': {},
      // 'cssnano': {},
      // 'postcss-url': {},
      // 'postcss-import': {},

      // Custom plugins
      'postcss-custom-media': {}
    }
  }
})
