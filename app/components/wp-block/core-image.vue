<template>
    <wp-image
        :class="classes"
        :image="embed"
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
    embed: {
        type: Object,
        default: () => ({})
    },    
})

// Computeds
const classes = computed(() => [
    'core-image',
    'margin-section',
    `align-${props.attrs?.align || 'center'}`,
    `size-${props.attrs?.sizeSlug || 'full'}`,
])
const styles = computed(() => {
    // Set max width to the number set by user in WP, or to the image width
    // But allow user to use WP's size buttons to force up-rez if they want
    let maxWidth = ""
    if (props.attrs.width) {
        maxWidth = props.attrs.width
    } else if (props.attrs.sizeSlug == "full") {
        maxWidth = `${props.embed?.width || -1}px`
    }

    return {
        maxWidth
    }
})
</script>

<style scoped>  
.core-image {
    --max-width: v-bind('styles.maxWidth');
    
    width: 100%;
    margin-right: auto;
    margin-left: auto;

    /* Align */
    &.align-center {
        margin-right: auto;
        margin-left: auto;
    }
    &.align-left {
        margin-left: 0;
        margin-right: auto;
    }
    &.align-right {
        margin-left: auto;
        margin-right: 0;
    }

    /* Sizes */
    &.size-full {
        max-width: var(--max-width, 100%);
    }
    &.size-large {
        max-width: var(--max-width, var(--unit-max-width-large));
    }
    &.size-medium {
        max-width: var(--max-width, 50%);
    }
    &.size-thumbnail {
        max-width: var(--max-width, 25%);
    }

    /* Breakpoints */
    @media (--lt-phone) {
        max-width: 100%;

        &.size-medium,
        &.size-thumbnail {
            max-width: 100%;
        }
    }
}
</style>