<template>
    <div :class="classes">
        <wp-content
            :blocks="innerBlocks"
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
    }
})

// Computeds
const classes = computed(() => [
    'core-column',
    `vertical-alignment-${props.attrs?.verticalAlignment || 'default'}`,
    { 'column-empty': props.innerBlocks?.length == 0 },
    { 'has-width': Boolean(props.attrs.width) }
])
const styles = computed(() => ({
    width: props.attrs?.width || '0'
}))
</script>

<style scoped>
.core-column {
    flex-basis: v-bind('styles.width');
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: stretch;

    :deep(> *) {
        width: 100%;
    }

    /* States */
    &.has-width {
        flex-grow: 0;
    }

    /* Vertical alignment opations */
    &.vertical-alignment-top {
        justify-content: flex-start;
    }
    &.vertical-alignment-center {
        justify-content: center;
    }
    &.vertical-alignment-bottom {
        justify-content: flex-end;
    }

    /* Make a column containing more columns collapse margin
    to be consistent with columns in regular content flow */
    .core-columns + .core-columns {
        margin-top: 0;
    }
    > .wp-content {
        margin: 0;
    }
}
</style>
