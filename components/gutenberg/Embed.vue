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
import buildVideoEmbedUrl from "~/utils/buildVideoEmbedUrl"

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
        iFrameSrc() {
            let url = this.url

            switch (true) {
                case this.isYouTube:
                case this.isVimeo:
                    url = buildVideoEmbedUrl(this.url, {
                        color: this.color,
                        autoplay: 0
                    })
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
