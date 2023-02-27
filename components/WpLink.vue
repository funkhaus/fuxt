<template>
    <nuxt-link
        v-if="isRelative || isInternal"
        class="wp-link"
        :to="parsedTo"
    >
        <slot />
    </nuxt-link>

    <a
        v-else-if="to"
        :href="parsedTo"
        :target="parsedTarget"
        class="wp-link"
    >
        <slot />
    </a>

    <component
        :is="element"
        v-else
        class="wp-link"
    >
        <slot />
    </component>
</template>

<script>
import _unescape from "lodash/unescape"

export default {
    props: {
        to: {
            type: String,
            default: ""
        },
        target: {
            type: String,
            default: "_self"
        },
        element: {
            type: String,
            default: "span"
        }
    },
    computed: {
        frontendUrl() {
            return this.$store.state.siteMeta.frontendUrl || false
        },
        isInternal() {
            // wp-content in url means probably a download link, so open in new window
            if (!this.to || this.to.includes("wp-content") || this.isEmail) {
                return false
            }
            return this.to.startsWith(this.frontendUrl)
        },
        isHashLink() {
            return this.to.startsWith("#")
        },
        isEmail() {
            return this.to.includes("mailto:")
        },
        isRelative() {
            let result = false
            switch (true) {
                case this.isEmail:
                    result = false
                    break
                case this.target == "_blank":
                    // If open in new window, then render an a-tag
                    result = false
                    break
                case this.to && String(this.to).indexOf(".") === 0:
                case this.to && String(this.to).indexOf("/") === 0:
                    // return true if we start with a slash
                    result = true
            }
            return result
        },
        escapedTo() {
            // Convert things like &amp; back to &.
            return _unescape(url)
        },
        parsedTo() {
            let url = this.to

            // Replace all these things
            const replaceThese = [
                this.$store.state.siteMeta?.frontendUrl || "",
                this.$store.state.siteMeta?.backendUrl || ""
            ]
            replaceThese.forEach((element) => {
                url = url.replace(element, "")
            })

            url = _unescape(url)

            // Abort for non-local links
            switch (true) {
                case this.isEmail:
                case url.startsWith("/"):
                case url.startsWith("."):
                case url.startsWith("http"):
                    return url
            }

            return `/${url}`
        },
        parsedTarget() {
            if (!this.isInternal && !this.isRelative && !this.isHashLink) {
                return "_blank"
            } else {
                return this.target
            }
        }
    }
}
</script>
