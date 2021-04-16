<template lang="html">
    <p
        class="guttenberg-paragraph"
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
.guttenberg-paragraph {
}
</style>
