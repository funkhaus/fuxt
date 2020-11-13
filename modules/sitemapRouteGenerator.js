const os = require("os")

export default function () {
    this.nuxt.hook("generate:done", (context) => {
        const routes = Array.from(context.generatedRoutes)
        this.nuxt.options.sitemap.routes = [...routes]

        console.log(this.nuxt.options.sitemap.hostname)
        this.nuxt.options.sitemap.hostname = "http://" + os.hostname()
    })
}
