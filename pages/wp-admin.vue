<template>
    <div class="page-admin">
        Redirecting to admin...
    </div>
</template>

<script>
export default {
    mounted() {
        // Show loading bar...
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })

        // Redirect to backend
        if (process.client) {
            window.location = `${this.$store.state.siteMeta.backendUrl}/wp-admin`
        }
    },
}
</script>

<style lang="scss" scoped>
.page-admin {
    display: none;
}
</style>
