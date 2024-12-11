<template>
    <component
        :is="listType"
        :class="classes"
    >
        <wp-block-core-list-item
            v-for="(block, i) in innerBlocks"
            :key="`list-item-${i}`"
            :inner-html="block.innerHtml"
        />
    </component>
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
    innerBlocks: {
        type: Array,
        default: () => []
    }
})

// Computeds
const classes = computed(() => [
    'core-list',
    'margin-text',
    `is-${listType.value}`
])
const listType = computed(() => {
    return props.attrs?.tagName || 'ul'
})

const styles = computed(() => ({
    fontSize: props.attrs?.style?.typography?.fontSize || 'initial',
    color: props.attrs?.style?.color?.text || 'initial',
    backgroundColor: props.attrs?.style?.color?.background || 'initial',
    letterSpacing: props.attrs?.style?.typography?.letterSpacing || 'initial'
}))
</script>

<style scoped>
.core-list {
    font-size: v-bind('styles.fontSize');
    color: v-bind('styles.color');
    background-color: v-bind('styles.backgroundColor');
    letter-spacing: v-bind('styles.letterSpacing');
}
</style>
