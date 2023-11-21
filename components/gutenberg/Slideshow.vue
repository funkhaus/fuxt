<template lang="html">
    <slideshow
        :slides="images"
        class="slideshow"
    >
        <wp-image
            slot="slide"
            slot-scope="{ slide }"
            :image="slide"
            class="image"
        />
    </slideshow>
</template>
<script>
export default {
    props: {
        images: {
            type: Array,
            default: () => []
        }
    }
}
</script>
<style lang="scss" scoped>
.slideshow {
    height: 800px;
    width: 100%;
    .image {
        height: 500px;
        width: 500px;
    }
}
</style>
