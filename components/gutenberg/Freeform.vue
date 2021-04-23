<template lang="html">
    <div
        class="gutenberg-freeform gutenberg-block"
        v-html="html"
    />
</template>

<script>
export default {
    props: {
        html: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-freeform {
}
</style>
