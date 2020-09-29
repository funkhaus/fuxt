import Vue from "vue"
import _kebabCase from "lodash/kebabCase"
let hasLoadedComponents = false

if (!hasLoadedComponents) {
    const components = require.context("~/components", true, /[A-Z]\w+\.(vue)$/)
    components.keys().map((fileName) => {
        // only load components in root or /shortcode dirs
        if (fileName.match(/shortcode/g) || fileName.match(/\//g).length == 1) {
            // Get component config
            const componentConfig = components(fileName)

            // Turn './ComponentName.vue' into 'component-name'
            const componentName = _kebabCase(
                fileName.replace(/^\.\//, "").replace(/\.vue$/, "")
            )

            // Register new component globally
            Vue.component(
                componentName,
                componentConfig.default || componentConfig
            )
        }
    })
    hasLoadedComponents = true
}
