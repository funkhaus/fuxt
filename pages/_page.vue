<template>
    <site-loading v-if="$apollo.loading" />

    <section
        v-else
        :class="classes"
    >
        <wp-image
            v-if="page.featuredImage"
            class="image"
            :image="page.featuredImage"
        />

        <wp-content :html="page.content" />
    </section>
</template>

<script>
// Helpers
import _get from "lodash/get"
import { getStripped } from "~/utils/tools"

// Queries
import HOME from "~/gql/queries/Home"

export default {
    computed: {
        classes() {
            return ["section", "section-home"]
        },
        path() {
            // FYI you can't query home by just using '/'
            let path = this.$route.path
            if (path == "/") {
                path = "/featured"
            }
            return path
        }
    },
    apollo: {
        page: {
            query: HOME,
            variables() {
                return {
                    uri: this.path
                }
            },
            update(data) {
                return _get(data, "nodeByUri", {})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.section-home {
    color: $black;
    margin: 0 auto;
    min-height: 100vh;
    text-align: center;

    .image {
        max-width: 50%;
        margin: 0 auto;
    }

    // Hover states
    // @media #{$hasHover} {
    // Hover styles would go here
    // }

    // Breakpoints
    // @media #{$lt-tablet} {
    // }
}
</style>
