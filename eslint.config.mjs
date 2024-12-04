import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
    features: {
        stylistic: {
            semi: false,
            indent: 4,
            quotes: 'single',
            commaDangle: 'never'
        },
        formatters: true,
        typescript: true
    }
})
