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
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-paragraph",
                `align-${this.textAlign || "default"}`
            ]
        },
        styles() {
            return {
                color: this.textColor,
                "background-color": this.backgroundColor,
                "font-size": this.fontSize
            }
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
}
</style>
