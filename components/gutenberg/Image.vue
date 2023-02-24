<template lang="html">
    <wp-image
        :class="classes"
        :image="image"
        :caption="caption"
        :style="styles"
    />
</template>

<script>
export default {
    props: {
        image: {
            type: Object,
            default: () => {}
        },
        size: {
            type: String,
            default: "large"
        },
        align: {
            type: String,
            default: "center"
        },
        caption: {
            type: String,
            default: ""
        },
        widthPixels: {
            type: Number,
            default: 0
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-image",
                "margin-section",
                `align-${this.align || "center"}`,
                `size-${this.size || "large"}`
            ]
        },
        styles() {
            let maxWidth = ""
            if (this.widthPixels) {
                maxWidth = `${this.widthPixels}px`
            }
            return {
                "--max-width": maxWidth
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-image {
    width: 100%;
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

    // Sizes
    &.size-full {
        max-width: var(--max-width, 100%);
    }
    &.size-large {
        max-width: var(--max-width, var(--unit-max-width-large));
    }
    &.size-medium {
        max-width: var(--max-width, 50%);
    }
    &.size-thumbnail {
        max-width: var(--max-width, 25%);
    }

    // Breakpoints
    @media #{$lt-phone} {
        max-width: 100%;

        &.size-medium,
        &.size-thumbnail {
            max-width: 100%;
        }
    }
}
</style>
