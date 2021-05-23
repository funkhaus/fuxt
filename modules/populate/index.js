import { resolve } from "path"

const empty = {}

export default function () {
    this.addPlugin({
        src: resolve(__dirname, "populate.server.js"),
        fileName: "populate.server.js",
    })
    this.nuxt.hook("generate:before", ({ setPayload }) => {
        // Use an empty object as payload just so server has
        // a hint that generate is being used
        setPayload(empty)
    })
}
