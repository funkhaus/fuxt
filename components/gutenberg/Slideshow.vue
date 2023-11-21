<template lang="html">
    <slideshow
        :slides="images"
        class="slideshow"
        @update:activeIndex="updateIndex"
    >
        <wp-image
            ref="image"
            slot="slide"
            slot-scope="{ slide }"
            :image="slide"
            class="image"
            object-fit="contain"
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
    display: block;
    height: 80vh;
    width: var(--unit-max-width-medium);
    overflow: hidden;
    position: relative;

    .image {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;

        height: 100%;
        width: 100%;
    }

    // Breakpoints
    @media #{$lt-phone} {
        width: var(--unit-max-width-small);
    }
}
</style>
