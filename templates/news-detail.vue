<template lang="html">
    <article class="page-news-detail">
        <h2
            class="title"
            v-html="page.title"
        />

        <wp-gutenberg
            id="content"
            class="content"
            :blocks="page.blocks"
        />

        Next: <br>
        {{ next }}
    </article>
</template>

<script>
// GQL
import NEWS_DETAIL from "~/gql/queries/NewsDetail"

export default {
    async asyncData({ $graphql, route }) {
        const data = await $graphql.default.request(NEWS_DETAIL, {
            uri: route.path
        })

        return {
            page: data.nodeByUri || {}
        }
    },
    computed: {
        next() {
            const next = this.page.previousPost?.node || {}
            return {
                title: next.title,
                text: next.excerpt,
                to: next.uri,
                image: next.featuredImage?.node || {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page-news-detail {
}
</style>
