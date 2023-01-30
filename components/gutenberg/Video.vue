<template lang="html">
    <video
        :class="classes"
        :src="parsedSrc"
        :muted="muted"
        :autoplay="autoplay"
        :controls="controls"
        :loop="loop"
        :poster="poster"
        :preload="preload"
        :disablepictureinpicture="disablepictureinpicture"
    />
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ""
        },
        muted: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        controls: {
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: true
        },
        preload: {
            type: String,
            default: "auto"
        },
        poster: {
            type: String,
            default: ""
        },
        disablepictureinpicture: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-video",
                "margin-section",
                `align-${this.align || "center"}`
            ]
        },
        parsedSrc() {
            return decodeURI(this.src).replaceAll("&amp;", "&")
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-video {
    display: block;
    width: 100%;
    height: auto;
    margin-right: auto;
    margin-left: auto;

    // Align
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

    // Breakpoints
    @media #{$lt-phone} {
        max-width: 100%;
    }
}
</style>
