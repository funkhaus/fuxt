<template>
    <p 
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
    'core-paragraph',    
    'margin-text',
    `align-${props.attrs?.align || 'default'}`,
])
const styles = computed(() => ({
    fontSize: props.attrs?.style?.typography?.fontSize || 'initial',
    color: props.attrs?.style?.color?.text || 'initial',
    backgroundColor: props.attrs?.style?.color?.background || 'initial',
    letterSpacing: props.attrs?.style?.typography?.letterSpacing || 'initial',
}))
</script>

<style scoped>  
.core-paragraph {
    font-size: v-bind('styles.fontSize');
    color: v-bind('styles.color');
    background-color: v-bind('styles.backgroundColor');
    letter-spacing: v-bind('styles.letterSpacing');

    &.align-left {
        text-align: left;
    }
    &.align-center {
        text-align: center;
    }
    &.align-right {
        text-align: right;
    }
    &.has-drop-cap:first-letter {
        float: left;
        font-size: 3em;
        padding-top: 0.15em;
        padding-right: 0.15em;
    }
}
</style>