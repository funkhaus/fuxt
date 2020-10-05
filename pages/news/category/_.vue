<template lang="html">
    <site-loading v-if="$fetchState.pending" />

    <section
        v-else
        class="page page-news-list"
    >
        Loop {{ posts }} here!

        <!-- TODO get infinate scrolling working here -->
    </section>
</template>

<script>
// GQL
import NEWS_LIST from "~/gql/queries/NewsList.gql"

// Helpers
import _get from "lodash/get"
import _head from "lodash/head"
import _last from "lodash/last"

export default {
    async fetch() {
        // Error if no category
        if (!this.lastCategory) {
            this.$nuxt.error({ statusCode: 404, message: "No category set" })
        }

        // Fetch for posts in category
        const data = await this.$graphql.request(NEWS_LIST, {
            categoryName: this.lastCategory,
        })
        this.posts = _get(data, "posts.nodes", [])
    },
    data() {
        return {
            posts: [],
        }
    },
    computed: {
        categories() {
            // Split the URI into paths to figure out which category to query
            let output = []
            if (this.$route.params.pathMatch) {
                output = this.$route.params.pathMatch.split("/")
            }
            return output
        },
        firstCategory() {
            return _head(this.categories)
        },
        lastCategory() {
            return _last(this.categories)
        },
    },
}
</script>

<style lang="scss" scoped>
.page-news-list {
}
</style>
