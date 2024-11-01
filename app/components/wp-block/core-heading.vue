<template>
    <component
        :is="attrs.tagName || 'h2'"
        :class="classes"
        v-html="innerHtml"
    />
</template>

<script setup lang="ts">
const props = defineProps({
    innerHtml: {
        type: String,
        default: ''
    },
    attrs: {
        type: Object,
        default: () => ({})
    },
})

// Computeds
const classes = computed(() => [
    'core-heading',
    'margin-text',
    `align-${props.attrs?.align || 'default'}`,
    `is-${props.attrs?.tagName}`,
])
const styles = computed(() => ({
    fontSize: props.attrs?.style?.typography?.fontSize || 'initial',
    color: props.attrs?.style?.color?.text || 'initial',
    backgroundColor: props.attrs?.style?.color?.background || 'initial',
    letterSpacing: props.attrs?.style?.typography?.letterSpacing || 'initial',
}))
</script>

<style scoped>  
.core-heading {
    font-size: v-bind('styles.fontSize');
    color: v-bind('styles.color');
    background-color: v-bind('styles.backgroundColor');
    letter-spacing: v-bind('styles.letterSpacing');

    font-weight: normal;

    /* Alignment */
    &.align-left {
        text-align: left;
    }
    &.align-center {
        text-align: center;
    }
    &.align-right {
        text-align: right;
    }
}
</style>