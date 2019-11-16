<template>
  <site-loading />
</template>

<script>
// Helpers
import _get from "lodash/get";
import config from "~/nuxt.config";

export default {
  transition: "fade",
  mounted() {
    if (process.client) {
      window.location = `${this.$store.state.siteMeta.apiUrl}/wp-admin`;
    }
  }
};
</script>
