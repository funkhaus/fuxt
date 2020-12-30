<template>
    <section
        v-if="page"
        :class="classes"
    >
        <wp-image
            class="image"
            :image="parsedPage.featuredImage"
        />

        <wp-content
            :html="parsedPage.encodedContent"
            :enable-styles="true"
        />
    </section>
</template>

<script>
// Helpers
import _get from "lodash/get"

// Queries
import HOME from "~/gql/queries/Home"
import ShortcodeSvg from "~/components/shortcode/Svg"

export default {
    components: {
        ShortcodeSvg,
    },
    async asyncData({ $graphql, route }) {
        const data = await $graphql.request(HOME, {
            uri: route.path,
        })
        return {
            page: _get(data, "nodeByUri", {}),
        }
    },
    computed: {
        classes() {
            return ["page", "page-home"]
        },
        parsedPage() {
            // Shape data from WP-GQL to work with template
            return {
                ...this.page,
                featuredImage: _get(this, "page.featuredImage.node", {}),
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.page-home {
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
