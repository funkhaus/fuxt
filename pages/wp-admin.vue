<template>
    <page-loading />
</template>

<script>
// Helpers
import _get from "lodash/get"
import config from "~/nuxt.config"

export default {
    transition: "fade",
    mounted() {
        const gqlEndpoint = _get(
            config,
            "apollo.clientConfigs.default.httpEndpoint",
            ""
        )
        if (process.client) {
            window.location = `${gqlEndpoint.split("/graphql")[0]}/wp-admin`
        }
    }
}
</script>
