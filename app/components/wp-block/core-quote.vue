<template lang="html">
    <blockquote :class="classes">
        <wp-block-core-paragraph
            v-for="(block, i) in innerBlocks"
            :key="`block-paragraph-${i}`"
            :attrs="block.attrs"
            :inner-html="block.innerHtml"
        />
        <cite
            v-if="citation"
            class="citation"
            v-html="citation"
        />
    </blockquote>
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
    },
})

// Computeds
const classes = computed(() => [
    'core-block',    
    'margin-section',
    `align-${props.attrs?.align || 'default'}`,
])
const styles = computed(() => ({
    fontSize: props.attrs?.style?.typography?.fontSize || 'initial',
    color: props.attrs?.style?.color?.text || 'initial',
    backgroundColor: props.attrs?.style?.color?.background || 'initial',
    letterSpacing: props.attrs?.style?.typography?.letterSpacing || 'initial',
}))
const citation = computed(() => {
    let cite = props.attrs?.citation || ''
    return cite.replace('<blockquote class="wp-block-quote"><cite>', '').replace('</cite></blockquote>', '')
})

</script>

<style scoped>  
.core-quote {
    font-size: v-bind('styles.fontSize');
    color: v-bind('styles.color');
    background-color: v-bind('styles.backgroundColor');
    letter-spacing: v-bind('styles.letterSpacing');

    font-weight: normal;

    .citation {
        font-style: normal;
        display: block;
    }

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