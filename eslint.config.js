import eslintConfigPrettier from "eslint-config-prettier"
import pluginVue from "eslint-plugin-vue"

export default [
    ...pluginVue.configs["flat/recommended"],
    eslintConfigPrettier,
]
