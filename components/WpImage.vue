<template>
    <figure :class="classes">
        <img
            v-if="parsedSrc"
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
            v-if="parsedVideoUrl"
            ref="video"
            class="media media-video"
            :src="parsedVideoUrl"
            :style="mediaStyles"
            :poster="parsedSrc"
            :loop="loop"
            :autoplay="autoplay"
            :muted="muted"
            :playsinline="playsinline"
            :disablepictureinpicture="disablepictureinpicture"
            @loadeddata="onLoaded('video')"
            @error="onError('video')"
            @ended="onEnded"
            @playing="onPlaying"
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
import _get from "lodash/get"
export default {
    props: {
        image: {
            type: Object,
            default: () => ({}),
        },
        height: {
            type: Number,
            default: 0,
        },
        width: {
            type: Number,
            default: 0,
        },
        src: {
            type: String,
            default: "",
        },
        srcset: {
            type: String,
            default: "",
        },
        sizes: {
            type: String,
            default: "",
        },
        alt: {
            type: String,
            default: "",
        },
        caption: {
            type: String,
            default: "",
        },
        aspectRatio: {
            type: Number,
            default: 0,
        },
        objectFit: {
            type: String,
            default: "cover",
        },
        mode: {
            type: String,
            default: "intrinsic-ratio",
        },
        backgroundColor: {
            type: String,
            default: "",
        },
        videoUrl: {
            type: String,
            default: "",
        },
        loop: {
            type: Boolean,
            default: true,
        },
        autoplay: {
            type: Boolean,
            default: true,
        },
        muted: {
            type: Boolean,
            default: true,
        },
        playsinline: {
            type: Boolean,
            default: true,
        },
        disablepictureinpicture: {
            type: Boolean,
            default: true,
        },
        focalPoint: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            loadedStatus: {
                booted: false,
            },
            errorStatus: {
                image: false,
                video: false,
            },
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
            return _get(this, "image.mediaDetails.height", "auto")
        },
        parsedWidth() {
            // default to defined width
            if (this.width) {
                return parseInt(this.width)
            }
            return _get(this, "image.mediaDetails.width", "auto")
        },
        parsedSrc() {
            return this.src || _get(this, "image.sourceUrl", "")
        },
        parsedSrcset() {
            return this.srcset || _get(this, "image.srcSet", "")
        },
        parsedSizes() {
            return this.sizes || _get(this, "image.sizes", "")
        },
        parsedColor() {
            return (
                this.backgroundColor ||
                _get(this, "image.imageMeta.primaryColor", "")
            )
        },
        parsedVideoUrl() {
            return this.videoUrl || _get(this, "image.imageMeta.videoUrl", "")
        },
        parsedFocalPoint() {
            return {
                x:
                    _get(this, "focalPoint.x", false) ||
                    _get(this.image, "imageMeta.focalPointX", ""),
                y:
                    _get(this, "focalPoint.y", false) ||
                    _get(this.image, "imageMeta.focalPointY", ""),
            }
        },
        parsedAlt() {
            return this.alt || _get(this, "image.altText", "")
        },
        parsedCaption() {
            return this.caption || _get(this, "image.caption", "")
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
            // Check if all are true. To handle if we have a video and an image.
            return Object.values(this.loadedStatus).every(Boolean)
        },
        hasError() {
            return Object.values(this.errorStatus).includes(true)
        },
        isSvg() {
            return this.parsedSrc.includes(".svg")
        },
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
    },
    mounted() {
        // Setup loaded state tracking
        if (this.parsedVideoUrl) {
            Vue.set(
                this.loadedStatus,
                "video",
                this.$refs.video.readyState >= 3
            )
        }
        if (this.parsedSrc) {
            Vue.set(this.loadedStatus, "image", this.$refs.img.complete)
        }
        // Set the booted flag
        Vue.set(this.loadedStatus, "booted", true)
        this.$emit("orientation", this.orientation)
    },
    methods: {
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
        },
        onPlaying($event) {
            this.$emit(`playing`, $event)
        },
        play() {
            if (this.$refs.video) {
                // HTML5 video method
                return this.$refs.video.play()
            }
        },
        volume(amount = false) {
            if (this.$refs.video) {
                // HTML5 video method
                if (amount === false) {
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
        },
    },
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
        opacity: 0.1;
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
    &.mode-intrinsic-ratio {
        position: relative;
    }
    &.mode-cover,
    &.mode-fullbleed {
        position: relative;

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
    &.has-loaded .media {
        opacity: 1;
    }

    // SVG overides as we won't have a height/width for intrinsic ratio.
    &.is-svg {
        .media {
            object-fit: contain;
            position: relative;
            height: auto;
            width: 100%;
        }
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
