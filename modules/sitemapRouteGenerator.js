const os = require("os")

export default function () {
    this.nuxt.hook("generate:done", (context) => {
        const routes = Array.from(context.generatedRoutes)
        this.nuxt.options.sitemap.routes = [...routes]
        console.log("OS hostname =", os.hostname())
    })
}
