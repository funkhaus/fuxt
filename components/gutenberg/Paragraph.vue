<template lang="html">
    <p
        :id="wpId"
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
            default: "",
        },
        align: {
            type: String,
            default: "",
        },
        fontSize: {
            type: String,
            default: "",
        },
        textColor: {
            type: String,
            default: "",
        },
        backgroundColor: {
            type: String,
            default: "",
        },
        wpId: {
            type: String,
            default: "",
        },
        wpClasses: {
            type: String,
            default: "",
        },
    },
    computed: {
        classes() {
            return ["gutenberg-paragraph", this.wpClasses]
        },
        styles() {
            return {
                color: this.textColor,
                "text-align": this.align,
                "background-color": this.backgroundColor,
                "font-size": this.fontSize,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-paragraph {
}
</style>
