import eslintConfigPrettier from "eslint-config-prettier"
import pluginVue from "eslint-plugin-vue"

export default [
    eslintConfigPrettier,
    ...pluginVue.configs["flat/recommended"],
    {
        rules: {
            // override/add rules settings here, such as:
            indent: ["error", 4, { SwitchCase: 1 }],
            "vue/html-indent": ["error", 4],
            semi: [2, "never"],
        },
    },
]
