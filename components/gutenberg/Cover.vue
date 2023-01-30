<template lang="html">
    <div
        :class="classes"
        :style="styles"
    >
        <wp-gutenberg
            :blocks="blocks"
            class="content"
        />
        <div
            class="overlay"
            :style="overlayStyles"
        />
    </div>
</template>

<script>
export default {
    props: {
        blocks: {
            type: Array,
            default: () => []
        },
        url: {
            type: String,
            default: ""
        },
        opacity: {
            type: Number,
            default: 0
        },
        isFixed: {
            type: Boolean,
            default: false
        },
        minHeight: {
            type: Number,
            default: 0
        },
        minHeightUnit: {
            type: String,
            default: "px"
        },
        gradient: {
            type: String,
            default: ""
        },
        customGradient: {
            type: String,
            default: ""
        },
        overlayColor: {
            type: String,
            default: ""
        },
        customOverlayColor: {
            type: String,
            default: ""
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-cover",
                { "is-fixed": this.isFixed },
                "margin-section"
            ]
        },
        styles() {
            let minHeight = `${this.minHeight}${this.minHeightUnit || "px"}`
            if (!this.minHeight) {
                minHeight = "none"
            }

            return {
                "background-image": `url(${this.url})`,
                "min-height": minHeight
            }
        },
        overlayStyles() {
            return {
                background: this.overlayBackground,
                opacity: this.opacity / 100
            }
        },
        overlayBackground() {
            return (
                this.customGradient ||
                this.customOverlayColor ||
                this.overlayColor ||
                this.gradient
            )
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-cover {
    position: relative;
    color: var(--color-white, #ffffff);

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;

    .content {
        position: relative;
        z-index: 10;
        margin: var(--unit-gutter) auto;
    }
    .overlay {
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        width: 100%;
    }
    &.is-fixed {
        background-attachment: fixed;
    }
}
</style>
