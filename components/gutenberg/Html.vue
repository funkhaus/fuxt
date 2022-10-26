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
export default {
    props: {
        html: {
            type: String,
            default: ""
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-html",
                "margin-section",
                { "is-iframe": this.isIframe },
                { "has-aspect-ratio": this.aspectPadding }
            ]
        },
        sizerStyles() {
            let styles = {}
            // Set padding for size
            if (this.isIframe && this.aspectPadding) {
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
            return Math.round(Number(height?.[1] || ""))
        },
        parsedWidth() {
            // Get the width from SVG attr
            const width = this.html.match(
                /^<iframe[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/
            )
            return Math.round(Number(width?.[1] || ""))
        },
        aspectPadding() {
            let output = (this.parsedHeight / this.parsedWidth) * 100

            if (!output) {
                output = 0
            }

            if (!this.parsedHeight || !this.parsedWidth) {
                output = 0
            }

            return output
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-html {
    .container {
        position: relative;
        z-index: 0;
    }
    &.has-aspect-ratio {
        ::v-deep iframe {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }
    &:not(.has-aspect-ratio) {
        ::v-deep iframe {
            margin-left: auto;
            margin-right: auto;
            display: block;
            max-width: 100%;
        }
    }
}
</style>
