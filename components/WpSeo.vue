<!--
    This component sets the heads tags based on the route.
    Mostly you do not need to change this, unless your frontend
    routes don't match WordPress routes. Then you can supply a custom path as a prop.

    If you use custom post types, then you will need to change the `~/gql/queries/Seo.gql` file.

    This file is included in Default layout, but on complex sites you
    may want to use it on pages templates as well to have more control over the SEO tags set.
-->
<template lang="html">
    <div class="wp-seo">
        <!-- Print content to page for SEO gain -->
        <h1
            v-if="parsedTitle"
            v-html="parsedTitle"
        />
        <div
            v-if="parsedDescription"
            v-html="parsedDescription"
        />
    </div>
</template>

<script>
// Helpers
import _get from "lodash/get"
import { getStripped } from "~/utils/tools"

// Queries
import SEO from "~/gql/queries/Seo.gql"

export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        imageUrl: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        path: {
            type: String,
            default: ""
        },
        stripFromPath: {
            type: String,
            default: "/news/"
        }
    },
    data() {
        return {
            data: {}
        }
    },
    head() {
        return {
            title: this.parsedTitle,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    property: "og:description",
                    content: this.parsedDescription
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: this.parsedImageUrl
                }
            ]
        }
    },
    computed: {
        parsedUri() {
            let output = this.path
            if (!output) {
                output = this.$route.path
            }

            // Strip /news/ from path, as often that is a blog post.
            if (this.stripFromPath) {
                output = output.replace(this.stripFromPath, "")
            }

            return output
        },
        parsedTitle() {
            let output = this.title

            // Try to set title from data, fallback to site title
            if (!output) {
                output = _get(this, "data.title", "")
            }
            if (!output) {
                output = _get(this, "$store.state.siteMeta.title", undefined)
            }

            return output
        },
        parsedDescription() {
            let output = this.description

            // Try to set description from page excerpt or content, fallback to site discription
            if (!output) {
                output = getStripped(this, "data.excerpt", "")
            }
            if (!output) {
                output = getStripped(this, "data.content", "")
            }
            if (!output) {
                output = getStripped(
                    this,
                    "$store.state.siteMeta.description",
                    undefined
                )
            }

            return output
        },
        parsedImageUrl() {
            let output = this.image

            if (!output) {
                output = _get(this, "data.featuredImage.sourceUrl", undefined)
            }
            if (!output) {
                output = _get(
                    this,
                    "$store.state.siteMeta.themeScreenshotUrl",
                    undefined
                )
            }

            // Use supplied image URL, or image from server, fallback to theme screenshot
            return output
        }
    },
    watch: {
        "$route.path": "$fetch"
    },
    async fetch() {
        // Abort if no path supplied (often because used on homepage)
        if (!this.parsedUri || this.parsedUri == "/") {
            this.data = {}
            return
        }

        // Get data from API
        try {
            const data = await this.$graphql.request(SEO, {
                uri: this.parsedUri
            })
            this.data = _get(data, "nodeByUri", {})
        } catch (e) {
            console.warn("<wp-seo> Fetch Error:", this.parsedUri, e)
        }
    }
}
</script>

<style lang="scss" scoped>
.wp-seo {
    display: none;
}
</style>
