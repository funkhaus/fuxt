import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
    features: {
        stylistic: {
            indent: 4,
            semi: false,
            commaDangle: 'never'
        },
        typescript: true
    }
})
