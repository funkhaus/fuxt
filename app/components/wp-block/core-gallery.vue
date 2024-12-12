<template lang="html">
    <div :class="classes">
        <wp-image
            v-for="image in images"
            :key="image.id"
            :image="image.embed"
            class="item"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    innerBlocks: {
        type: Array,
        default: () => []
    },
    attrs: {
        type: Object,
        default: () => ({})
    }
})

// Computeds
const classes = computed(() => [
    'core-gallery',
    'margin-section',
    `is-${props.attrs?.columns || 3}-columns`,
    { 'mode-default': !props.attrs?.imageCrop || false },
    { 'mode-cropped': props.attrs?.imageCrop || false },
    { 'is-random': props.attrs?.randomOrder || false }
])

// Handle random order of gallery items in SSR friendly way
const images = useState('images', () => {
    const blocks = props.innerBlocks
    if (props.attrs?.randomOrder) {
        return _Shuffle(blocks)
    }
    return blocks
})
</script>

<style scoped>
.core-gallery {
    --gap: var(--unit-gallery-gap, --unit-gap);

    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    align-items: normal;

    /* Columns */
    &.is-1-columns {
        .item {
            width: 100%;
        }
    }
    &.is-2-columns {
        .item {
            width: calc(50% - var(--gap));
        }
    }
    &.is-3-columns {
        .item {
            width: calc(33.33% - var(--gap));
        }
    }
    &.is-4-columns {
        .item {
            width: calc(25% - var(--gap));
        }
    }
    &.is-5-columns {
        .item {
            width: calc(20% - var(--gap));
        }
    }
    &.is-7-columns {
        .item {
            width: calc(14.2857142857% - var(--gap));
        }
    }
    &.is-8-columns {
        .item {
            width: calc(12.5% - var(--gap));
        }
    }

    /* Crop modes */
    .item {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        max-width: 100%;
        position: relative;
    }
    &.mode-default {
        .item {
            margin-bottom: auto;
            margin-top: auto;
        }
    }
    &.mode-cropped {
        /* .item {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: center;
            max-width: 100%;
            position: relative;
        } */
    }

    /* Breakpoints */
    @media (--lt-phone) {
        display: block;

        /* &.mode-cropped {

        } */

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
