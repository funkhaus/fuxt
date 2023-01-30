<template lang="html">
    <li
        :class="classes"
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
    },
    computed: {
        classes() {
            return ["gutenberg-list-item"]
        }
    }
}
</script>

<style lang="scss">
.gutenberg-list-item {
}
</style>
