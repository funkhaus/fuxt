<template>
    <site-loading />
</template>

<script>
export default {
    mounted() {
        if (process.client) {
            window.location = `${this.$store.state.siteMeta.apiUrl}/wp-admin`
        }
    }
}
</script>
