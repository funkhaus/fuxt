<template>
    <section class="page-home">
        <wp-image
            class="image"
            :image="parsedPage.featuredImage"
        />

        <wp-gutenberg
            id="content"
            :blocks="parsedPage.blocks"
        />
    </section>
</template>

<script>
// Queries
import HOME from "~/gql/queries/Home"

export default {
    async asyncData({ $graphql, route }) {
        const data = await $graphql.default.request(HOME, {
            uri: route.path
        })
        return {
            page: data.nodeByUri || {}
        }
    },
    computed: {
        parsedPage() {
            // Shape data from WP-GQL to work with template
            return {
                ...this.page,
                featuredImage: this.page.featuredImage?.node || {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page-home {
    color: var(--color-black);
    margin: 0 auto;
    min-height: var(--unit-100vh);

    .image {
        max-width: 50%;
        margin: 0 auto;
    }

    // Hover states
    @media #{$has-hover} {
        // Hover styles would go here
    }

    // Breakpoints
    @media #{$lt-phone} {
        // Phone styles would go here
    }
}
</style>
