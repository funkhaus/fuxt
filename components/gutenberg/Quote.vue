<template lang="html">
    <blockquote
        :class="classes"
        :style="styles"
    >
        <gutenberg-paragraph
            v-for="(block, i) in innerBlocks"
            :key="`block-paragraph-${i}`"
            v-bind="block"
        />
        <cite
            v-if="citation"
            class="citation"
            v-html="citation"
        />
    </blockquote>
</template>

<script>
export default {
    props: {
        innerBlocks: {
            type: Array,
            default: () => []
        },
        citation: {
            type: String,
            default: ""
        },
        textAlign: {
            type: String,
            default: "default"
        },
        fontSize: {
            type: String,
            default: ""
        },
        textColor: {
            type: String,
            default: ""
        },
        backgroundColor: {
            type: String,
            default: ""
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-quote",
                "margin-section",
                { "has-citation": this.citation },
                `align-${this.textAlign || "default"}`
            ]
        },
        styles() {
            return {
                color: this.textColor,
                "background-color": this.backgroundColor,
                "font-size": this.parsedFontSize
            }
        },
        parsedFontSize() {
            let output = ""
            if (this.fontSize) {
                output = `${this.fontSize}px`
            }
            return output
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-quote {
    font-weight: normal;

    .citation {
        font-style: normal;
        display: block;
    }

    /* Alignment */
    &.align-left {
        text-align: left;
    }
    &.align-center {
        text-align: center;
    }
    &.align-right {
        text-align: right;
    }
}
</style>
