<template>
    <site-loading v-if="$fetchState.pending" />

    <section
        v-else
        :class="classes"
    >
        <wp-image
            v-if="page.featuredImage"
            class="image"
            :image="page.featuredImage"
        />

        <shortcode-svg
            class="shortcode-svg"
            url="http://fuxt-backend.flywheelsites.com/wp-content/uploads/2020/06/logo-wsj.svg"
        />

        <wp-content
            :html="page.content"
            :enable-styles="true"
        />
    </section>
</template>

<script>
// Helpers
import _get from "lodash/get"
import { getStripped } from "~/utils/tools"

// Queries
import HOME from "~/gql/queries/Home"
import ShortcodeSvg from "@/components/shortcode/Svg"

export default {
    components: {
        ShortcodeSvg,
    },
    async fetch() {
        const data = await this.$graphql.request(HOME, {
            uri: this.path,
        })
        this.page = _get(data, "nodeByUri", {})
    },
    data() {
        return {
            page: {},
        }
    },
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
        },
    },
}
</script>

<style lang="scss" scoped>
.section-home {
    color: var(--color-black);
    margin: 0 auto;
    min-height: var(--unit-100vh);
    text-align: center;

    .image {
        max-width: 50%;
        margin: 0 auto;
    }

    // Hover states
    // @media #{$has-hover} {
    // Hover styles would go here
    // }

    // Breakpoints
    // @media #{$lt-tablet} {
    // }
}
</style>
