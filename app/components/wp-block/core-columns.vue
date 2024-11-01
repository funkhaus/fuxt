<template>
    <div :class="classes">
        <wp-block-core-column
            v-for="(column, index) in innerBlocks"
            :key="`core-column-${index}`"
            :attrs="column.attrs"
            :inner-blocks="column.innerBlocks"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    attrs: {
        type: Object,
        default: () => ({})
    },
    innerBlocks: {
        type: Array,
        default: () => []
    },
})

// Computeds
const classes = computed(() => [
    'core-columns',
    'margin-section',
    { "is-stacked-on-mobile": props.attrs.isStackedOnMobile }
])

</script>

<style scoped>
.core-columns {
    display: flex;
    width: 100%;

    .core-column {
        &:first-child {
            padding-left: 0;
        }
        &:last-child {
            padding-right: 0;
        }
    }

    /* Breakpoints */
    @media (--lt-phone) {
        &.is-stacked-on-mobile {
            display: block;

            .gutenberg-column {
                flex-basis: 1;
                padding: 0;
            }
        }
    }
}
</style>