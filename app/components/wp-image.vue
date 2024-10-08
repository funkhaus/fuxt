<template>
    <figure :class="classes">
        <img
            v-if="src && !disabled"
            ref="imageEl"
            class="media media-image"
            :src="src"
            :srcset="srcSet"
            :sizes="parsedSizes"
            loading="lazy"
            :alt="alt"
            @load="setImageLoaded"
        >

        <video
            v-if="videoUrl && !disabled"
            ref="videoEl"
            class="media media-video"
            :src="videoUrl"
            :loop="props.loop"
            :autoplay="props.autoplay"
            :muted="props.muted"
            playsinline
            disablePictureInPicture="true"
            @playing="onPlaying"
        />

        <figcaption
            v-if="caption"
            class="caption"
            v-text="caption"
        />
    </figure>
</template>

<script setup lang="ts">
const imageEl = ref(null)
const videoEl = ref(null)
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
    },
    aspectRatio: {
        type: [String, Number],
        default: 0
    },
    mode: {
        type: String,
        default: 'intrinsic-ratio'
    },
    objectFit: {
        type: String,
        default: 'cover'
    },
    sizes: {
        type: String,
        default: ''
    }
})

// State
const isPlaying = ref(false)

// Computeds
const classes = computed(() => [
    'wp-image',
    { 'has-loaded': imageLoaded.value },
    { 'has-video': hasVideo.value },
    `mode-${props.mode}`,
    `object-fit-${props.objectFit}`,
    `is-orientation-${orientation.value}`,
    { 'is-disabled': props.disabled },
    { 'is-playing': isPlaying.value }
])
const src = computed(() => props.image?.src || '')
const videoUrl = computed(() => props.image?.acf?.videoUrl || '')
const hasVideo = computed(() => Boolean(videoUrl.value))
const height = computed(() => props.image?.height || props.image?.meta?.height || 0)
const width = computed(() => props.image?.width || props.image?.meta?.width || 0)
const alt = computed(() => props.image?.alt || '')
const caption = computed(() => props.image?.caption || '')
const srcSet = computed(() => props.image?.srcset || '')
const parsedAspectRatio = computed(() => `${width.value} / ${height.value}`)
const parsedSizes = computed(() => {
    let output = props.sizes || props.image?.sizes || ''

    // Handle some custom size shortcuts
    switch (props.sizes) {
        case 'full':
        case 'full-screen':
        case 'fullscreen':
            output = '(max-width: 850px) 1920px, 100vw'
            break

        case 'half':
        case 'half-screen':
            output = '(max-width: 850px) 100vw, 50vw'
            break

        case 'third':
        case 'third-screen':
            output = '(max-width: 850px) 100vw, 33.33vw'
            break

        case 'quarter':
        case 'quarter-screen':
            output = '(max-width: 850px) 100vw, 25vw'
            break
    }

    return output
})
const orientation = computed(() => {
    let output = 'landscape'
    switch (true) {
        case height.value > width.value:
            output = 'portrait'
            break

        case height.value == width.value:
            output = 'square'
            break
    }
    return output
})
const cssVars = ref({
    aspectRatio: parsedAspectRatio.value
})

// Actions
const setImageLoaded = () => {
    imageLoaded.value = true
}
const onPlaying = () => {
    isPlaying.value = true
}

// Lifecycle hooks
onMounted(() => {
    imageLoaded.value = imageEl.value?.complete || false
    isPlaying.value = !videoEl.value?.paused || false
})
</script>

<style scoped>
.wp-image {
    margin: 0;
    width: 100%;

    .media {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
        z-index: 10;
    }
    .media-video {
        z-index: 20;
    }
    .caption {
        display: none;
    }

    /* Modes */
    &:where(.mode-intrinsic-ratio) {
        position: relative;
        aspect-ratio: v-bind('cssVars.aspectRatio');
    }
    &:where(.mode-cover) {
        position: relative;
    }
    &.mode-cover {
        .sizer {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
        }
    }

    /* Object fit modes */
    &.object-fit-cover .media {
        object-fit: cover;
    }
    &.object-fit-contain .media {
        object-fit: contain;
    }

    /* Loaded & active states */
    &.has-loaded {
        .media-image {
            opacity: 1;
        }
    }
    &.is-playing {
        .media-image {
            /* Hide image when video is playing to avoid overlaps */
            opacity: 0;
        }
        .media-video {
            opacity: 1;
        }
    }
}
</style>
