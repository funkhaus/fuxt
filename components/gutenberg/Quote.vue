<template lang="html">
    <blockquote
        class="gutenberg-quote"
        v-html="parsedContent"
    />
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: ""
        },
        citation: {
            type: String,
            default: ""
        }
    },
    computed: {
        parsedContent() {
            let output = this.content
            if (this.citation) {
                output = `${output} <cite class="citation">${this.citation}</cite>`
            }
            return output
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-quote {
}
</style>
