<template lang="html">
    <wp-image
        :class="classes"
        :image="image"
        :caption="caption"
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
        max-width: 100%;
    }
    &.size-large {
        max-width: 100%;
    }
    &.size-medium {
        max-width: 50%;
    }
    &.size-thumbnail {
        max-width: 25%;
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
