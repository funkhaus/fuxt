<template>
    <div :class="classes">
        <!--
            <responsive-image
                v-for="(image, i) in images"
                :key="i"
                :image="image"
                :aspect-ratio="56.25"
                class="gallery-block"
            />
        -->
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            default: () => []
        },
        columns: {
            type: [Number, String],
            default: 2
        }
    },
    computed: {
        classes() {
            return ["shortcode-gallery", `columns-${this.columns}`]
        }
    }
}
</script>

<style lang="scss">
.shortcode-gallery {
    font-size: 0;
    letter-spacing: 0;
    margin: 50px 0;

    // Default 2 columns
    .gallery-block {
        display: inline-block;
        padding: 0 1.5px;
        margin-bottom: 3px;
        box-sizing: border-box;
        width: 50%;
    }

    // Column variants
    &.columns-1 {
        .gallery-block {
            width: 100%;
        }
    }
    &.columns-3 {
        .gallery-block {
            width: 33.33%;
        }
    }

    // Multiple galleries used next to each another
    & + .shortcode-gallery {
        margin-top: -50px;
    }

    // Breakpoints
    @media #{$lt-tablet} {
        &.columns-2,
        &.columns-3 {
            .gallery-block {
                width: 100%;
            }
        }
    }
}
</style>
