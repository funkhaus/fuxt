<template lang="html">
    <div :class="classes">
        <div
            v-for="column in parsedImages"
            class="column item"
        >
            <wp-image
                v-for="image in column"
                :key="image.id"
                :image="image"
                class="image"
            />
        </div>

        <!-- This is shown on mobile, or used when cropped is true -->
        <wp-image
            v-for="image in images"
            :key="image.id"
            class="single-column item image"
            :image="image"
            :aspect-ratio="croppedRatio"
        />
    </div>
</template>

<script>
import sortColumns from "~/utils/sortColumns"

export default {
    props: {
        images: {
            type: Array,
            default: () => []
        },
        caption: {
            type: String,
            default: ""
        },
        columns: {
            type: Number,
            default: 1
        },
        imageCrop: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-gallery",
                "margin-section",
                `is-${this.parsedColumns}-columns`,
                { "mode-cropped": this.imageCrop },
                { "mode-masonry": !this.imageCrop }
            ]
        },
        croppedRatio() {
            let output = null
            const firstImageDimensions = this.images?.[0]?.mediaDetails || {}

            // If imageCrop enabled, then size all images the same as first
            if (this.imageCrop) {
                output =
                    (firstImageDimensions.height / firstImageDimensions.width) *
                    100
            }
            return output
        },
        parsedColumns() {
            return this.columns || 1
        },
        parsedImages() {
            // Sort images into columns for a masonry style layout
            let output = []
            if (this.images.length) {
                output = sortColumns(this.images, this.parsedColumns)
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

    // Modes
    &.mode-masonry {
        .column {
            display: block;
        }
        .single-column {
            display: none;
        }
    }
    &.mode-cropped {
        .column {
            display: none;
        }
        .single-column {
            display: block;
        }
    }

    // Columns Mode
    .column {
        box-sizing: border-box;
    }
    .image {
        flex-grow: 1;
    }
    &.is-1-columns {
        .item {
            width: 100%;
        }
    }
    &.is-2-columns {
        .item {
            width: 50%;
        }
    }
    &.is-3-columns {
        .item {
            width: 33.33%;
        }
    }
    &.is-4-columns {
        .item {
            width: 25%;
        }
    }
    &.is-5-columns {
        .item {
            width: 20%;
        }
    }
    &.is-7-columns {
        .item {
            width: 14.2857142857%;
        }
    }
    &.is-8-columns {
        .item {
            width: 12.5%;
        }
    }

    // Breakpoints
    @media #{$lt-phone} {
        display: block;

        &.mode-cropped,
        &.mode-masonry {
            .column {
                display: none;
            }
            .single-column {
                display: block;
            }
        }

        &.is-2-columns,
        &.is-3-columns,
        &.is-4-columns,
        &.is-5-columns,
        &.is-6-columns,
        &.is-7-columns,
        &.is-8-columns {
            .item {
                width: 100%;
            }
        }
    }
}
</style>
