<template lang="html">
    <wp-image
        class="gutenberg-image"
        :image="image"
    />
</template>

<script>
export default {
    props: {
        image: {
            type: Object,
            default: () => {},
        },
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-image {
    max-width: var(--unit-max-width);
    margin: 2em auto;
}
</style>
