// Register all files inside /components globally
import Vue from "vue"
import _kebabCase from "lodash/kebabCase"

const components = require.context("~/components", true, /[A-Z]\w+\.(vue)$/)
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
