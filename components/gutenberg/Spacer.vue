<template lang="html">
    <div
        class="gutenberg-spacer gutenberg-block"
        :style="styles"
    >
        <!-- A spacer is placed here -->
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: String,
            default: "0px"
        }
    },
    computed: {
        styles() {
            return {
                padding: `0 0 ${this.height} 0`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-spacer {
}
</style>
