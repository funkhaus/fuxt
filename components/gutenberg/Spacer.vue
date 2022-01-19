<template lang="html">
    <div
        class="gutenberg-spacer gutenberg-block"
        :style="styles"
    />
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        styles() {
            return {
                margin: `0 0 ${this.height}px 0`,
            }
        },
    },
}
</script>

<style lang="css" scoped>
.gutenberg-spacer {
}
</style>
