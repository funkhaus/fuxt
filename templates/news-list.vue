<template>
    <section class="page-news-list">
        {{ parsedPosts }}

        <!--
        // Include our lazy-loader component if you want this
        <lazy-loader
            :gql-doc="NEWS_LIST"
            :amount="10"
            :items.sync="posts"
            :start-cursor="startCursor"
        >
            <template #load-more>
                Click me to load more!
            </template>

            <template #loading>
                Loading...
            </template>
        </lazy-loader>
        -->
    </section>
</template>

<script>
// Helpers
import _get from "lodash/get"

// Queries
import NEWS_LIST from "~/gql/queries/NewsList"

export default {
    async asyncData({ $graphql, route }) {
        const data = await $graphql.default.request(NEWS_LIST, {
            categoryName: route.params.category || "",
            after: route.params.cursor,
        })

        return {
            posts: _get(data, "posts.nodes", []),
            startCursor: _get(data, "pageInfo.endCursor", ""),
        }
    },
    data() {
        return {
            NEWS_LIST,
        }
    },
    computed: {
        parsedPosts() {
            return this.posts.map((obj) => {
                return {
                    ...obj,
                    image: _get(obj, "featuredImage.node", {}),
                    categories: _get(obj, "categories.nodes", []),
                    to: obj.uri,
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.page-news-list {
}
</style>
