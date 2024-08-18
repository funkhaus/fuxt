// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  // required for @nuxtjs/storybook
  vue: {
    runtimeCompiler: true
  },

  // css: ['~/assets/css/main.css'],

  modules: ['@nuxt/fonts', '@pinia/nuxt', '@nuxtjs/storybook'],

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
