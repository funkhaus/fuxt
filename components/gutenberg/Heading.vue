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
            default: 2,
        },
        content: {
            type: String,
            default: "",
        },
        textColor: {
            type: String,
            default: "",
        },
        textAlign: {
            type: String,
            default: "",
        },
        backgroundColor: {
            type: String,
            default: "",
        },
        fontSize: {
            type: String,
            default: "",
        },
    },
    computed: {
        element() {
            return `h${this.level}`
        },
        styles() {
            return {
                color: this.textColor,
                "text-align": this.textAlign,
                "background-color": this.backgroundColor,
                "font-size": this.fontSize,
            }
        },
        classes() {
            return ["gutenberg-heading", `is-h${this.level}`]
        },
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-heading {
}
</style>
