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
            default: "default",
        },
    },
    computed: {
        classes() {
            return [
                "gutenberg-quote",
                "margin-section",
                `align-${this.textAlign || "default"}`,
            ]
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
    font-weight: normal;

    ::v-deep .citation {
        font-style: normal;
        font-size: 20px;
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
    &.is-style-large {
        /* TODO Bigger text option here */
    }
}
</style>
