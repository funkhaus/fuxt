<template>
    <figure :class="classes">
        <img
            v-if="parsedSrc && !disabled"
            ref="img"
            class="media media-image"
            :src="parsedSrc"
            :srcset="parsedSrcset"
            :sizes="parsedSizes"
            :style="mediaStyles"
            :alt="parsedAlt"
            :height="parsedHeight"
            :width="parsedWidth"
            @load="onLoaded('image')"
            @error="onError('image')"
        >

        <video
            v-if="isVideo && !disabled"
            ref="video"
            class="media media-video"
            :src="parsedVideoUrl"
            :style="mediaStyles"
            :loop="loop"
            :autoplay="autoplay"
            :muted="muted"
            :playsinline="playsinline"
            :disablepictureinpicture="disablepictureinpicture"
            @loadeddata="onLoaded('video')"
            @error="onError('video')"
            @ended="onEnded"
            @playing="onPlaying"
            @pause="onPause"
        />

        <div
            class="sizer"
            :style="sizerStyles"
        />
        <div
            class="background-color"
            :style="backgroundStyles"
        />

        <figcaption
            v-if="parsedCaption"
            class="caption"
            v-html="parsedCaption"
        />

        <slot />
    </figure>
</template>

<script>
// Helpers
import Vue from "vue"

export default {
    props: {
        image: {
            type: Object,
            default: () => ({})
        },
        height: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 0
        },
        src: {
            type: String,
            default: ""
        },
        srcset: {
            type: String,
            default: ""
        },
        sizes: {
            type: String,
            default: ""
        },
        alt: {
            type: String,
            default: ""
        },
        caption: {
            type: String,
            default: ""
        },
        aspectRatio: {
            type: Number,
            default: 0
        },
        objectFit: {
            type: String,
            default: "cover"
        },
        mode: {
            type: String,
            default: "intrinsic-ratio"
        },
        backgroundColor: {
            type: String,
            default: ""
        },
        videoUrl: {
            type: String,
            default: ""
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
        playsinline: {
            type: Boolean,
            default: true
        },
        disablepictureinpicture: {
            type: Boolean,
            default: true
        },
        focalPoint: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loadedStatus: {
                booted: false
            },
            errorStatus: {
                image: false,
                video: false
            },
            isPlaying: false
        }
    },
    computed: {
        classes() {
            return [
                "wp-image",
                `mode-${this.mode}`,
                { "has-loaded": this.hasLoaded },
                { "has-background-color": this.parsedColor },
                { "has-error": this.hasError },
                { "has-image-error": this.errorStatus.image },
                { "has-video-error": this.errorStatus.video },
                `is-orientation-${this.orientation}`,
                `object-fit-${this.objectFit}`,
                { "is-svg": this.isSvg },
                { "is-video": this.isVideo },
                { "is-disabled": this.disabled },
                { "is-playing": this.isPlaying }
            ]
        },
        aspectPadding() {
            let output =
                this.aspectRatio || (this.parsedHeight / this.parsedWidth) * 100
            if (!output) {
                output = 0
            }
            return output
        },
        orientation() {
            let output = "landscape"
            switch (true) {
                case this.parsedHeight > this.parsedWidth:
                    output = "portrait"
                    break

                case this.parsedHeight == this.parsedWidth:
                    output = "square"
                    break
            }
            return output
        },
        parsedHeight() {
            // default to defined height
            if (this.height) {
                return parseInt(this.height)
            }
            return this.image?.mediaDetails?.height || "auto"
        },
        parsedWidth() {
            // default to defined width
            if (this.width) {
                return parseInt(this.width)
            }
            return this.image?.mediaDetails?.width || "auto"
        },
        parsedSrc() {
            return this.src || this.image?.sourceUrl || ""
        },
        parsedSrcset() {
            return this.srcset || this.image?.srcSet || ""
        },
        parsedSizes() {
            let output = this.sizes || this.image?.sizes || ""

            // Handle some custom size shortcuts
            if (this.sizes == "fullscreen") {
                output = "(max-width: 850px) 1920px, 100vw"
            }

            return output
        },
        parsedColor() {
            return (
                this.backgroundColor ||
                this.image?.imageMeta?.primaryColor ||
                ""
            )
        },
        parsedVideoUrl() {
            return this.videoUrl || this.image?.imageMeta?.videoUrl || ""
        },
        parsedFocalPoint() {
            return {
                x:
                    (this.focalPoint.x, false) ||
                    this.image?.imageMeta?.focalPointX ||
                    "",
                y:
                    (this.focalPoint.y, false) ||
                    this.image?.imageMeta?.focalPointY ||
                    ""
            }
        },
        parsedAlt() {
            return this.alt || this.image?.altText || ""
        },
        parsedCaption() {
            return this.caption || this.image?.caption || ""
        },
        sizerStyles() {
            let styles = {}
            // Set padding for size
            if (this.mode == "intrinsic-ratio") {
                styles.paddingBottom = `${this.aspectPadding}%`
            }
            return styles
        },
        backgroundStyles() {
            let styles = {}
            // Set background color
            if (this.parsedColor) {
                styles.backgroundColor = `${this.parsedColor}`
            }
            return styles
        },
        mediaStyles() {
            let styles = {}
            if (
                this.parsedFocalPoint.x !== "" &&
                this.parsedFocalPoint.y !== ""
            ) {
                styles.objectPosition = `${this.parsedFocalPoint.x}% ${this.parsedFocalPoint.y}%`
            }
            return styles
        },
        hasLoaded() {
            // Check if image has loaded. The idea being, show the image until video starts playing.
            return this.loadedStatus.image == true
        },
        hasError() {
            return Object.values(this.errorStatus).includes(true)
        },
        isSvg() {
            return this.parsedSrc.includes(".svg")
        },
        isVideo() {
            return this.parsedVideoUrl
        }
    },
    watch: {
        // Update loaded state if new src set
        parsedVideoUrl(newVal) {
            if (newVal) {
                Vue.set(this.loadedStatus, "video", false)
                Vue.set(this.errorStatus, "video", false)
            }
        },
        // Update loaded state if new src set
        parsedSrc(newVal) {
            if (newVal) {
                Vue.set(this.loadedStatus, "image", false)
                Vue.set(this.errorStatus, "image", false)
            }
        },
        disabled(newVal) {
            if (!newVal) {
                this.$nextTick(() => {
                    this.init()
                })
            }
        }
    },
    mounted() {
        if (!this.disabled) {
            this.init()
        }
    },
    methods: {
        init() {
            // Setup loaded state tracking
            if (this.parsedVideoUrl) {
                Vue.set(
                    this.loadedStatus,
                    "video",
                    this.$refs.video?.readyState >= 3 || false
                )
            }
            if (this.parsedSrc) {
                Vue.set(
                    this.loadedStatus,
                    "image",
                    this.$refs.img?.complete || false
                )
            }
            // Set the booted flag
            Vue.set(this.loadedStatus, "booted", true)
            this.$emit("orientation", this.orientation)
        },
        onLoaded(type) {
            Vue.set(this.loadedStatus, type, true)
            this.$emit("loaded", type)
            this.$emit(`loaded-${type}`)
        },
        onError(type) {
            Vue.set(this.errorStatus, type, true)
            this.$emit("error", type)
            this.$emit(`error-${type}`)
        },
        onEnded($event) {
            this.$emit(`ended`, $event)
            this.isPlaying = false
        },
        onPlaying($event) {
            this.$emit(`playing`, $event)
            this.isPlaying = true
        },
        onPause($event) {
            this.$emit(`paused`, $event)
            this.isPlaying = false
        },
        play() {
            if (this.$refs.video && this.$refs.video.paused) {
                return this.$refs.video.play()
            }
        },
        volume(amount = false) {
            if (this.$refs.video) {
                if (amount !== false) {
                    this.$refs.video.volume = amount
                }
                return this.$refs.video.volume
            }
        },
        pause() {
            if (this.$refs.video) {
                // HTML5 video method
                this.$refs.video.pause()
            }
        },
        seekTo(seconds = 0) {
            if (this.$refs.video) {
                // HTML5 video method
                this.$refs.video.currentTime = seconds
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wp-image {
    margin: 0;
    width: 100%;

    .sizer {
        position: relative;

        z-index: 0;
    }
    .background-color {
        opacity: 0.2;
        z-index: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
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

    // Modes
    &:where(.mode-intrinsic-ratio, .mode-cover) {
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

    // Object fit modes
    &.object-fit-cover .media {
        object-fit: cover;
    }
    &.object-fit-contain .media {
        object-fit: contain;
    }

    // Loaded state
    &.has-loaded {
        .media-image {
            opacity: 1;
        }
    }
    &.is-playing {
        .media-image {
            // Hide image when video is playing to avoid overlaps
            opacity: 0;
        }
        .media-video {
            opacity: 1;
        }
    }

    // SVG overides as we won't have a height/width for intrinsic ratio.
    &.is-svg .media {
        object-fit: contain;
        position: relative;
        height: auto;
        width: 100%;
    }

    // Error state (only show the media that is working)
    &.has-error {
        .media {
            opacity: 1;
        }
        &.has-image-error .media-image {
            opacity: 0;
        }
        &.has-video-error .media-video {
            opacity: 0;
        }
    }
}
</style>
