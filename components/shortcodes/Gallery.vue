<template>
    <div class="shortcode-gallery">
        <!-- <responsive-image
            v-for="(image, i) in images"
            :key="i"
            :image="image"
            :aspect-ratio="56.25"
            class="gallery-block"
        /> -->
    </div>
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

<style lang="scss">
.shortcode-gallery {
    font-size: 0;
    letter-spacing: 0;

    .gallery-block {
        width: 33.33%;
        display: inline-block;
        padding: 0 5px;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
}
</style>
