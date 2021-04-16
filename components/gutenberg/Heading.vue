<template lang="html">
    <component
        :is="element"
        class="gutenberg-heading"
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
        }
    },
    computed: {
        element() {
            return `h${this.level}`
        }
    }
}
</script>

<style lang="scss" scoped></style>
