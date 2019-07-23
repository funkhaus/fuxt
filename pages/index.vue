<template>
    <site-loading v-if="$apollo.loading" />

    <section
        v-else
        :class="classes"
    >
        <svg-logo-funkhaus />
    </section>
</template>

<script>
import _get from "lodash/get"
import HomeQuery from "~/queries/HomeQuery.gql"

export default {
    transition: "fade",
    head() {
        return {
            title: _get(this, "page.title", ""),
            meta: [
                {
                    hid: "description",
                    name: "description",
                    property: "og:description",
                    content: _get(this, "page.excerpt", "")
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: _get(this, "page.featuredImage.sourceUrl", "")
                }
            ]
        }
    },
    computed: {
        classes() {
            return ["section", "section-home"]
        }
    },
    apollo: {
        page: {
            query: HomeQuery,
            variables() {
                return {
                    uri: "/featured" // FYI you can't query home by just using '/'
                }
            },
            update(data) {
                return data
            }
        }
    }
}
</script>

<style lang="scss">
.section-home {
    color: $black;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    // Breakpoints
    // @media #{$lt-tablet} {
    // }
}
</style>
