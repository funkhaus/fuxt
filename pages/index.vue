<template>
    <site-loading v-if="$apollo.loading" />

    <section
        v-else
        :class="classes"
    >
        <!--
        You should probably use the wp-content compoennt here
        SEE https://github.com/funkhaus/components/blob/master/src/components/WpContent.vue
        -->
        <div v-html="page.content" />
    </section>
</template>

<script>
// Helpers
import _get from "lodash/get"
import { getStripped } from "~/utils/tools"

// Queries
import HOME from "~/gql/queries/Home"

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
            return ["section", "section-home"]
        }
    },
    apollo: {
        page: {
            query: HOME,
            variables() {
                return {
                    uri: "/featured" // FYI you can't query home by just using '/'
                }
            },
            update(data) {
                return _get(data, "pageBy", "")
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
