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

        <!-- TODO: replace after/if merged - For the working showcase -->
        <transition name="fade">
            <canvas
                v-if="blurhash && showBlurhash && enableBlurhash"
                ref="blurhashCanvas"
                class="blurhash-bg"
                aria-hidden="true"
            />
            <!-- <canvas
                v-if="blurhash && !imageLoaded && !disabled"
                ref="blurhashCanvas"
                class="blurhash-bg"
            /> -->
        </transition>

        <figcaption
            v-if="caption"
            class="caption"
            v-text="caption"
        />

        <slot />
    </figure>
</template>

<script setup lang="ts">
/**
 * decodes the blurhash and displays it on a canvas as a blurry placeholder image
 * SEE https://www.npmjs.com/package/blurhash
 */
import { decode } from 'blurhash'

const blurhashCanvas = ref<HTMLCanvasElement | null>(null)

const imageEl = ref(null)
const videoEl = ref(null)
const imageLoaded = ref(false)

const emit = defineEmits(['image-loaded', 'is-playing', 'is-paused', 'is-ended'])

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
    },
    enableBlurhash: {
        type: Boolean,
        default: true
    }
})

// State
const isPlaying = ref(false)

// TODO: Delete this, only for testing purposes
const showBlurhash = ref(true)

// Computed
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
const blurhash = computed(() => props.image?.acf?.blurhash || props.image?.blurhash || '')
const parsedAspectRatio = computed(() => {
    let output = `${width.value} / ${height.value}`

    if (props.aspectRatio && typeof props.aspectRatio === 'number') {
        output = 100 / props.aspectRatio
    }
    return output
})
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
    emit('image-loaded')
}
const onPlaying = () => {
    isPlaying.value = true
    emit('is-playing')
}

const pause = () => {
    if (videoEl.value) {
        videoEl.value.pause()
        isPlaying.value = false
        emit('is-paused')
    }
}

const play = () => {
    if (videoEl.value) {
        videoEl.value.play()
        isPlaying.value = true
        emit('is-playing')
    }
}

// Expose to parent
defineExpose({
    play,
    pause
})

// Watchers
// This decodes the blurhash code from the backend and draws it as a blurry placeholder image on the canvas, scaled up to fill the image area. This provides a nice preview while the real image loads.
function drawBlurhash() {
    if (!blurhash.value || !blurhashCanvas.value) return
    // Sets the canvas size to 32x32 pixels. This is the resolution at which the blurhash will be decoded.
    const width = 32
    const height = 32
    blurhashCanvas.value.width = width
    blurhashCanvas.value.height = height
    // Uses the decode function to turn the blurhash string into pixel data (RGBA values) for a 32x32 image.
    const pixels = decode(blurhash.value, width, height)
    // Gets the 2D drawing context from the canvas.
    const ctx = blurhashCanvas.value.getContext('2d')
    if (!ctx) return
    // Creates a new ImageData object for the 32x32 pixel grid.
    const imageData = ctx.createImageData(width, height)
    // Sets the pixel data from the decoded blurhash.
    imageData.data.set(pixels)
    // Draws this image data onto the canvas at position (0,0).
    ctx.putImageData(imageData, 0, 0)
    // Sets the canvas’s CSS width and height to 100% so it fills its container, but the actual pixel data remains low-res and blurry.
    blurhashCanvas.value.style.width = '100%'
    blurhashCanvas.value.style.height = '100%'
}

// Lifecycle hooks
onMounted(() => {
    imageLoaded.value = imageEl.value?.complete || false
    isPlaying.value = videoEl.value ? !videoEl.value?.paused : false

    drawBlurhash()

    // TODO: Remove this after testing
    setTimeout(() => {
        showBlurhash.value = false
    }, 2000)
})
</script>

<style scoped>
.wp-image {
    margin: 0;
    width: 100%;

    position: relative;

    .blurhash-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        border-radius: inherit;
        pointer-events: none;
        display: block;
    }

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
