import { resolve } from "path"

export default function () {
    this.addTemplate({
        src: resolve(__dirname, "populate.server.js"),
        fileName: "populate.server.js"
    })
    this.nuxt.hook("build:before", () => {
        this.options.plugins.push(`${__dirname}/populate.server.js`)
    })
    this.nuxt.hook("generate:before", ({ setPayload }) => {
        // Use an empty object as payload just so server has
        // a hint that generate is being used
        setPayload({})
    })
}
