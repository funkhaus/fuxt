<template>
    <div :class="classes">
        <div
            class="container"
            :style="sizerStyles"
            v-html="html"
        />
    </div>
</template>
<script>
import _get from "lodash/get"

export default {
    props: {
        html: {
            type: String,
            default: "",
        },
    },
    computed: {
        classes() {
            return [
                "gutenberg-html",
                "margin-section",
                { "is-iframe": this.isIframe },
            ]
        },
        sizerStyles() {
            let styles = {}
            // Set padding for size
            if (this.isIframe) {
                styles.paddingBottom = `${this.aspectPadding}%`
            }
            return styles
        },
        isIframe() {
            return this.html.includes("<iframe")
        },
        parsedHeight() {
            // Get the height from SVG attr
            const height = this.html.match(
                /^<iframe[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/
            )
            return Math.round(Number(_get(height, "[1]", 1080)))
        },
        parsedWidth() {
            // Get the width from SVG attr
            const width = this.html.match(
                /^<iframe[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/
            )
            return Math.round(Number(_get(width, "[1]", 1920)))
        },
        aspectPadding() {
            let output = (this.parsedHeight / this.parsedWidth) * 100
            if (!output) {
                output = 0
            }
            return output
        },
    },
}
</script>

<style lang="css" scoped>
.gutenberg-html {
    .container {
        position: relative;
        z-index: 0;
    }
    ::v-deep iframe {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}
</style>
