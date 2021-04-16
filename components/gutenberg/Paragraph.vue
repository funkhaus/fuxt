<template lang="html">
    <p
        class="gutenberg-paragraph"
        v-html="content"
    />
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-paragraph {
}
</style>
