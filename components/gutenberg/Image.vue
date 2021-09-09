<template lang="html">
    <wp-image
        :class="classes"
        :image="image"
        :style="styles"
    />
</template>

<script>
import _get from "lodash/get"

export default {
    props: {
        image: {
            type: Object,
            default: () => {},
        },
        wpWidth: {
            type: Number,
            default: 0,
        },
        align: {
            type: String,
            default: "center",
        },
    },
    computed: {
        width() {
            const imgWidth = _get(this, "image.mediaDetails.width", 0)

            let output = 100
            if (this.wpWidth && this.wpWidth < imgWidth) {
                output = (this.wpWidth / imgWidth) * 100
            }
            return output
        },
        classes() {
            return [
                "gutenberg-image",
                "margin-section",
                `align-${this.align || "center"}`,
            ]
        },
        styles() {
            return {
                "--max-width": `${this.width}%`,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-image {
    width: 100%;
    max-width: var(--max-width, 100%);
    margin-right: auto;
    margin-left: auto;

    // Align
    &.align-center {
        margin-right: auto;
        margin-left: auto;
    }
    &.align-left {
        margin-left: 0;
        margin-right: auto;
    }
    &.align-right {
        margin-left: auto;
        margin-right: 0;
    }

    // Breakpoints
    @media #{$lt-phone} {
        max-width: 100%;
    }
}
</style>
