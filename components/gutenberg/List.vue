<template lang="html">
    <ul
        class="gutenberg-list"
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
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-list {
}
</style>
