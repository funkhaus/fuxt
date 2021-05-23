import { existsSync } from "fs"
import { resolve, join } from "path"

const empty = {}

export default function () {
    this.addPlugin({
        src: resolve(__dirname, "populate.server.js"),
        fileName: "populate.server.js",
    })
    this.nuxt.hook("generate:before", ({ setPayload }) => {
        // Use an empty object as payload just to server as
        // a hint that generate is being used
        setPayload(empty)
    })
}
