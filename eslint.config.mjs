import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import pluginJsonc from 'eslint-plugin-jsonc'
import parserJsonc from 'jsonc-eslint-parser'

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
}).append(
    {
        files: ['**/*.json'],
        plugins: {
            jsonc: pluginJsonc
        },
        languageOptions: {
            parser: parserJsonc
        },
        name: 'jsonc/rules',
        rules: {
            ...pluginJsonc.configs['flat/recommended-with-json'].rules,
            'jsonc/indent': ['error', 4]
        }
    }
)
