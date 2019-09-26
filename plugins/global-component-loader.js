import Vue from "vue"
import _kebabCase from "lodash/kebabCase"

// Register all files inside the root of ~/components globally
const components = require.context("~/components", false, /[A-Z]\w+\.(vue)$/)
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

// Components used globally. Generally anything that is a shortcode would go here.
//import shortcodeGallery from "~/components/shortcode/Gallery"
//Vue.component("shortcode-gallery", shortcodeGallery)
