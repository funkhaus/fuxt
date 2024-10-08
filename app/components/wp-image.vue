<template>
    <figure :class="classes">
        <img
            v-if="src && !disabled"
            ref="imageEl"
            :src="src"
            loading="lazy"
            class="media media-image"
            @load="setImageLoaded"
        >

        <video
            v-if="videoUrl && !disabled"
            :src="videoUrl"
            :loop="props.loop"
            :autoplay="props.autoplay"
            :muted="props.muted"
            playsinline
            disablePictureInPicture="true"
            class="media media-video"
        />

        <!-- TODO Aspect ratio and show video on top -->
        <!-- TODO Add caption -->
        <!-- TODO Background color -->
        <!-- TODO Focal points color -->
        <!-- TODO Sizing modes -->
        <!-- TODO SrcSets and Sizes -->
        <!-- TODO Only load video when coming into view -->
        <!-- TODO Has-loaded of video? -->
    </figure>
</template>

<script setup lang="ts">
const imageEl = ref(null)
const imageLoaded = ref(false)

// Props
const props = defineProps({
    image: {
        type: Object,
        default: () => ({})
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loop: {
        type: Boolean,
        default: true
    },
    autoplay: {
        type: Boolean,
        default: true
    },
    muted: {
        type: Boolean,
        default: true
    }
})

// Computeds
const classes = computed(() => ['wp-image', { 'has-loaded': imageLoaded.value }, { 'has-video': hasVideo.value }])
const src = computed(() => props.image?.src || '')
const videoUrl = computed(() => props.image?.acf?.videoUrl || '')
const hasVideo = computed(() => Boolean(videoUrl.value))

// Actions
const setImageLoaded = () => {
    imageLoaded.value = true
}

// Lifecycle hooks
onMounted(() => {
    imageLoaded.value = imageEl.value?.complete || false
})
</script>

<style scoped>
.wp-image {
    margin: 0;
    width: 100%;

    .media {
        max-width: 100%;
        height: auto;
    }
}
</style>
