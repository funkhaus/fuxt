<template lang="html">
    <wp-image
        class="gutenberg-image gutenberg-block"
        :image="image"
    />
</template>

<script>
export default {
    props: {
        image: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-image {
    width: 100%;
}
</style>
