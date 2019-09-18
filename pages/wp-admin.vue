<template>
    <site-loading />
</template>

<script>
import _get from "lodash/get"
import siteLoading from "~/components/site/Loading"
import config from "~/nuxt.config"

export default {
    components: {
        siteLoading
    },
    transition: "fade",
    mounted() {
        let gqlEndpoint = _get(
            config,
            "apollo.clientConfigs.default.httpEndpoint",
            ""
        )

        let wpAdmin = `${gqlEndpoint.split("/graphql")[0]}/wp-admin`

        window.location = wpAdmin
    }
}
</script>
