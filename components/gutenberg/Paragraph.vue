<template lang="html">
    <p
        :class="classes"
        :style="styles"
        v-html="content"
    />
</template>

<script>
export default {
    props: {
        content: {
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
        },
        dropCap: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-paragraph",
                `align-${this.textAlign || "default"}`,
                "margin-text",
                { "has-drop-cap": this.dropCap }
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
.gutenberg-paragraph {
    &.align-left {
        text-align: left;
    }
    &.align-center {
        text-align: center;
    }
    &.align-right {
        text-align: right;
    }
    &.has-drop-cap:first-letter {
        float: left;
        font-size: 3em;
        padding-top: 0.15em;
        padding-right: 0.15em;
    }
}
</style>
