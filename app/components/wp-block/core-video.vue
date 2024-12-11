<template lang="html">
    <video
        :class="classes"
        :src="parsedSrc"
        :muted="attrs.muted"
        :autoplay="attrs.autoplay"
        :controls="attrs.controls"
        :loop="attrs.loop"
        :poster="attrs.poster"
        :preload="attrs.preload"
        :disablepictureinpicture="true"
        :playsinline="attrs.playsInline"
    />
</template>

<script setup lang="ts">
const props = defineProps({
    attrs: {
        type: Object,
        default: () => ({})
    }
})

// Computeds
const classes = computed(() => [
    'core-video',
    'margin-section',
    `align-${props.attrs?.align || 'center'}`
])
const parsedSrc = computed(() => {
    // Try to get src from attrs or caption (to support old WP versions)
    const captionSrc = props.attrs?.caption?.match(/src="([^"]*)"/) || []
    const src = props.attrs?.src || captionSrc?.[1] || ''
    return decodeURI(src).replaceAll('&amp;', '&')
})
</script>

<style scoped>
.core-video {
    display: block;
    width: 100%;
    height: auto;
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
}
</style>
