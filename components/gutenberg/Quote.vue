<template lang="html">
    <blockquote
        :class="classes"
        v-html="parsedContent"
    />
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: "",
        },
        citation: {
            type: String,
            default: "",
        },
        textAlign: {
            type: String,
            default: "center",
        },
    },
    computed: {
        classes() {
            return ["gutenberg-quote", `align-${this.textAlign}`]
        },
        parsedContent() {
            let output = this.content
            if (this.citation) {
                output = `${output} <cite class="citation">${this.citation}</cite>`
            }
            return output
        },
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-quote {
    margin: 2em auto;
    max-width: var(--unit-max-width);

    &.align-right {
        text-align: right;
    }
    &.align-left {
        text-align: left;
    }
    &.align-center {
        text-align: center;
    }
}
</style>
