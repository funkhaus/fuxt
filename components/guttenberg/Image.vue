<template lang="html">
    <wp-image
        class="guttenberg-image"
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
.guttenberg-image {
}
</style>
