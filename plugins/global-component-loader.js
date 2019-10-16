import Vue from "vue"
import _kebabCase from "lodash/kebabCase"

// Register all files inside the root of ~/components and ~/components/shortcode
let componentDirs = [
    require.context("~/components", false, /[A-Z]\w+\.(vue)$/),
    require.context("~/components/shortcode", false, /[A-Z]\w+\.(vue)$/)
]
componentDirs.forEach(components => {
    components.keys().map(fileName => {
        // Get component config
        const componentConfig = components(fileName)

        // Turn './ComponentName.vue' into 'component-name'
        const componentName = _kebabCase(
            fileName.replace(/^\.\//, "").replace(/\.vue$/, "")
        )

        // Register new component globally
        Vue.component(componentName, componentConfig.default || componentConfig)
    })
})
