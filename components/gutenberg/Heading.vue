<template lang="html">
    <component
        :is="element"
        :class="classes"
        :style="styles"
        v-html="content"
    />
</template>

<script>
export default {
    props: {
        level: {
            type: Number,
            default: 2
        },
        content: {
            type: String,
            default: ""
        },
        textColor: {
            type: String,
            default: ""
        },
        textAlign: {
            type: String,
            default: "default"
        },
        backgroundColor: {
            type: String,
            default: ""
        },
        fontSize: {
            type: String,
            default: ""
        }
    },
    computed: {
        element() {
            return `h${this.level}`
        },
        styles() {
            return {
                color: this.textColor,
                "background-color": this.backgroundColor,
                "font-size": this.fontSize
            }
        },
        classes() {
            return [
                "gutenberg-heading",
                "gutenberg-block",
                "margin-text",
                `is-h${this.level}`,
                `align-${this.textAlign || "default"}`
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-heading {
    font-weight: normal;

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
