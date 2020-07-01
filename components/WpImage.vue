<template>
    <div :class="classes">
        <div
            class="sizer"
            :style="sizerStyles"
        >
            <img
                v-if="parsedSrc"
                ref="img"
                class="media image"
                :src="parsedSrc"
                :srcset="parsedSrcset"
                :sizes="parsedSizes"
                :style="mediaStyles"
                @load="setLoaded('image')"
                @error="setError('image')"
            >

            <video
                v-if="parsedVideoUrl"
                ref="video"
                class="media video"
                :src="parsedVideoUrl"
                :style="mediaStyles"
                :poster="parsedSrc"
                :loop="loop"
                :autoplay="autoplay"
                :muted="muted"
                :playsinline="playsinline"
                @loadeddata="setLoaded('video')"
                @error="setError('video')"
            />
        </div>
        <slot />
    </div>
</template>

<script>
// Helpers
import Vue from "vue"
import _get from "lodash/get"
export default {
    props: {
        image: {
            type: Object,
            default: () => {}
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
        focalPoint: {
            type: Object,
            default: () => {}
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
            }
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
                { "has-image-error": this.hasError.image },
                { "has-video-error": this.hasError.video },
                `is-orientation-${this.orientation}`
            ]
        },
        aspectPadding() {
            return (
                this.aspectRatio || (this.parsedHeight / this.parsedWidth) * 100
            )
        },
        orientation() {
            let output = "landscape"
            if (this.parsedHeight > this.parsedWidth) {
                output = "portrait"
            }
            return output
        },
        parsedHeight() {
            // default to defined height
            if (this.height) {
                return parseInt(this.height)
            }
            return this.image.mediaDetails.height
        },
        parsedWidth() {
            // default to defined width
            if (this.width) {
                return parseInt(this.width)
            }
            return this.image.mediaDetails.width
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
                _get(this, "image.acfImageMeta.primaryColor", "")
            )
        },
        parsedVideoUrl() {
            return (
                this.videoUrl || _get(this, "image.acfImageMeta.videoUrl", "")
            )
        },
        parsedFocalPoint() {
            return {
                x:
                    _get(this, "focalPoint.x", false) ||
                    _get(this.image, "acfImageMeta.focalPointX", ""),
                y:
                    _get(this, "focalPoint.y", false) ||
                    _get(this.image, "acfImageMeta.focalPointY", "")
            }
        },
        sizerStyles() {
            let styles = {}
            // Set padding for size
            if (this.mode == "intrinsic-ratio") {
                styles.paddingBottom = `${this.aspectPadding}%`
            }
            // Set background color
            if (this.parsedColor) {
                styles.backgroundColor = `${this.parsedColor}`
            }
            return styles
        },
        mediaStyles() {
            let styles = {
                objectFit: this.objectFit
            }
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
            return Object.values(this.errorStatus).every(Boolean)
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
        }
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
    },
    methods: {
        setLoaded(type) {
            Vue.set(this.loadedStatus, type, true)
            this.$emit(`loaded-${type}`)
        },
        setError(type) {
            Vue.set(this.errorStatus, type, true)
            this.$emit(`error-${type}`)
        },
        play() {
            // HTML5 video methods
            if (this.$refs.video) {
                this.$refs.video.play()
            }
        },
        pause() {
            // HTML5 video methods
            if (this.$refs.video) {
                this.$refs.video.pause()
            }
        }
    }
}
</script>

<style lang="scss">
.wp-image {
    .sizer {
        position: relative;
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
    .video {
        z-index: 20;
    }
    // Modes
    &.mode-intrinsic-ratio {
        position: relative;
    }
    &.mode-fullbleed {
        .sizer {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
        }
    }
    // Loaded state
    &.has-loaded .media {
        opacity: 1;
    }
    // Error state (only show the media that is working)
    &.has-error {
        .media {
            opacity: 1;
        }
        &.has-image-error .image {
            opacity: 0;
        }
        &.has-video-error .video {
            opacity: 0;
        }
    }
}
</style>
