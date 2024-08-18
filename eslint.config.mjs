import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: {
      indent: 2,
      semi: false,
      commaDangle: 'never'
    },
    typescript: true
  }
})
