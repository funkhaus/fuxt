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
            type: [String, Number],
            default: "100px",
        },
    },
    computed: {
        styles() {
            return {
                margin: `0 0 ${parseInt(this.height)}px 0`,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-spacer {
    min-height: 1px;
}
</style>
