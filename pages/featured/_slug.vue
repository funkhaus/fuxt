<template>
    <site-loading v-if="$apollo.loading" />

    <section
        v-else
        :class="classes"
    >
        <div v-html="page.content" />
    </section>
</template>

<script>
// Helpers
import _get from "lodash/get"
import { getStripped } from "~/utils/tools"

// Queries
import Home from "~/gql/queries/Home"

export default {
    head() {
        return {
            title: "",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    property: "og:description",
                    content: getStripped(this, "page.excerpt")
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: _get(
                        this,
                        "page.featuredImage.sourceUrl",
                        undefined
                    )
                }
            ]
        }
    },
    computed: {
        classes() {
            return ["section", "section-featured"]
        }
    },
    apollo: {
        page: {
            query: Home,
            variables() {
                return {
                    uri: this.$route.fullPath
                }
            },
            update(data) {
                return _get(data, "pageBy", "")
            }
        }
    }
}
</script>

<style lang="scss">
.section-featured {
    color: $black;
    margin: 0 auto;
    min-height: 100vh;
    text-align: center;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;

    // Hover states
    // @media #{$hasHover} {
    // Hover styles would go here
    // }

    // Breakpoints
    // @media #{$lt-tablet} {
    // }
}
</style>
