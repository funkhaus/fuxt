<template lang="html">
    <div :class="classes">
        <div
            v-for="image in images"
            :key="image.id"
            class="image"
        >
            <wp-image
                :image="image"
                :aspect-ratio="isCropped"
            />
        </div>
    </div>
</template>

<script>
import _get from "lodash/get"

export default {
    props: {
        images: {
            type: Array,
            default: []
        },
        caption: {
            type: String,
            default: ""
        },
        columns: {
            type: Number,
            default: 2
        },
        imageCrop: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes() {
            return ["gutenberg-gallery", `is-${this.columns}-columns`]
        },
        isCropped() {
            let output = null
            const firstImageDimensions = _get(
                this,
                "images[0].mediaDetails",
                {}
            )

            // If imageCrop enabled, then size all images the same as first
            if (this.imageCrop) {
                output =
                    (firstImageDimensions.height / firstImageDimensions.width) *
                    100
            }
            return output
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-gallery {
    display: flex;
    flex-wrap: wrap;

    .image {
        box-sizing: border-box;

        &:first-child {
            margin-left: 0;
        }
        &:last-child {
            margin-right: 0;
        }
    }

    // Columns
    &.is-1-columns {
        .image {
            width: 100%;
        }
    }
    &.is-2-columns {
        .image {
            width: 50%;
        }
    }
    &.is-3-columns {
        .image {
            width: 33.33%;
        }
    }
    &.is-4-columns {
        .image {
            width: 25%;
        }
    }
    &.is-5-columns {
        .image {
            width: 20%;
        }
    }
    &.is-7-columns {
        .image {
            width: 14.2857142857%;
        }
    }
    &.is-8-columns {
        .image {
            width: 12.5%;
        }
    }
}
</style>
