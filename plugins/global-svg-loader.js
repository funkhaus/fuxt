import Vue from 'vue'
import _kebabCase from "lodash/kebabCase"

// Get a listing of all svgs in static/svgs and load them using the svg-inline-loader
const svgs = require.context("!!svg-inline-loader?removeSVGTagAttrs=false&idPrefix=prefix-[sha512:hash:hex:5]-!~/assets/svgs", true, /.+\.svg$/)
svgs.keys().map(fileName => {

    // Parse fileName to kebab case of file name
    const componentName = _kebabCase(
        fileName.replace(/^\.\//, "").replace(/\.svg$/, "")
    )

    // Instantiate instace of the vue template compiler
    const compiler = require('vue-template-compiler')
    // Compile svg code to vue template with render function
    const componentCode = compiler.compileToFunctions(svgs(fileName))

    // Register svg component with 'svg-' prefix
    Vue.component('svg-' + componentName, componentCode)


})
