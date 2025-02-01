<template>
    <div
        :class="classes"
        :style="styles"
    >
        <wp-content
            :blocks="innerBlocks"
            class="content"
        />
        <div
            class="overlay"
            :style="overlayStyles"
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

const classes = computed(() => [
    'core-cover',
    { 'is-fixed': props.attrs?.isFixed },
    { 'is-repeated': props.attrs?.isRepeated },
    'margin-section'
])

const styles = computed(() => {
    let minHeight = `${props.attrs?.minHeight}${props.attrs?.minHeightUnit || 'px'}`
    if (!props.attrs?.minHeight) {
        minHeight = 'none'
    }

    return {
        'background-image': `url(${props.attrs?.url})`,
        'min-height': minHeight
    }
})

const overlayStyles = computed(() => ({
    background: overlayBackground.value,
    opacity: opacityValue.value
}))

const overlayBackground = computed(() => (
    props.attrs?.customGradient
    || props.attrs?.customOverlayColor
    || props.attrs?.overlayColor
    || props.attrs?.gradient
))

const opacityValue = computed(() => (
    props.attrs?.opacity / 100
    || props.attrs?.dimRatio / 100
))
</script>

<style scoped>
.core-cover {
    position: relative;
    color: var(--color-white);

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    .content {
        position: relative;
        z-index: 10;
        margin: var(--unit-gutter) auto;
    }
    .overlay {
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
    }
    &.is-fixed {
        background-attachment: fixed;
    }
    &.is-repeated {
        background-repeat: repeat;
        background-size: auto;
    }
}
</style>
