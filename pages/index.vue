<template>
    <site-loading v-if="$apollo.loading" />

    <section v-else :class="classes">
        <svg-logo-funkhaus />
    </section>
</template>

<script>
import _get from "lodash/get"
//import HomeQuery from '~/queries/pages/HomeQuery.gql'

export default {
    transition: "fade",
    head() {
        return {
            title: _get(this, "page.title", "")
            meta: [
                {
                    hid: "description",
                    name: "description",
                    property: "og:description",
                    content: _get(this, "page.excerpt", "")
                }
            ]
        }
    },
    computed: {
        classes() {
            return ["section", "section-home"]
        }
    }
    // apollo: {
    //     page: {
    //         query: indexQuery,
    //         variables() {
    //             return {
    //                 uri: "/"
    //             }
    //         },
    //         update(data) {
    //             return data
    //         }
    //     }
    // }
}
</script>

<style lang="scss">
@import "~/styles/_vars.scss";

.section-home {
    color: $black;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
