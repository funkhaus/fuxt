<template lang="html">
    <div :class="classes">
        <div class="container">
            <!-- .container allows for paddings to work with ratio sizing-->

            <lazy-video-player
                v-if="hasCustomPlayer && isVimeo"
                :src="url"
                :title="caption"
                :dimensions="dimensions"
                :autoplay="false"
            />

            <iframe
                v-else
                class="iframe"
                :src="iFrameSrc"
                :title="caption"
                frameborder="0"
                allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture;"
                playsinline
                :height="dimensions.height"
                :width="dimensions.width"
            />
            <div
                class="sizer"
                :style="sizerStyles"
            />

            <slot />
        </div>
    </div>
</template>

<script>
import Vue from "vue"

export default {
    props: {
        url: {
            type: String,
            default: ""
        },
        provider: {
            type: String,
            default: ""
        },
        caption: {
            type: String,
            default: ""
        },
        color: {
            type: String,
            default: ""
        },
        wpClasses: {
            type: String,
            default: ""
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-embed",
                "margin-section",
                { "is-vimeo": this.isVimeo },
                { "is-youtube": this.isYouTube }
            ]
        },
        hasCustomPlayer() {
            return Boolean(Vue.options.components["VideoPlayer"])
        },
        sizerStyles() {
            return {
                "padding-top": `${this.aspectRatio}%`
            }
        },
        isVimeo() {
            return (
                this.provider == "vimeo" ||
                String(this.url).includes("vimeo.com")
            )
        },
        isYouTube() {
            return (
                this.provider == "youtube" ||
                String(this.url).includes("youtube.com") ||
                String(this.url).includes("youtu.be")
            )
        },
        youTubeId() {
            // Regex to find the YouTube ID from these:
            // https://www.youtube.com/watch?v=wSX9F6ETTDQ
            // https://youtu.be/wSX9F6ETTDQ
            var regex = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/
            const matches = this.url.match(regex)
            return (matches?.[1] || "").trim()
        },
        vimeoId() {
            if (!this.isVimeo) {
                return ""
            }

            return this.url.replace("https://vimeo.com/", "").trim()
        },
        iFrameSrc() {
            let url = this.url

            switch (true) {
                case this.isVimeo:
                    url = `https://player.vimeo.com/video/${this.vimeoId}?&byline=0&portrait=0&autoplay=false&playsinline=true&color=${this.color}`
                    break

                case this.isYouTube:
                    url = `https://www.youtube.com/embed/${this.youTubeId}?&autoplay=false&playsinline=1&rel=0&modestbranding=1&controls=1&enablejsapi=1&color=${this.color}`
                    break
            }

            return url
        },
        dimensions() {
            let output = {
                height: 720,
                width: 1280
            }

            // Go through each class, and figure out the ratio from this: "wp-embed-aspect-16-9"
            this.wpClasses.split(" ").forEach((str) => {
                if (str.includes("wp-embed-aspect-")) {
                    let ratio = str.replace("wp-embed-aspect-", "")
                    ratio = ratio.split("-")

                    output.width = parseInt(ratio[0])
                    output.height = parseInt(ratio[1])
                }
            })

            return output
        },
        aspectRatio() {
            return (this.dimensions.height / this.dimensions.width) * 100
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-embed {
    .container {
        position: relative;
        z-index: 0;
    }
    .iframe {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}
</style>
