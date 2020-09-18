<template lang="html">
    <!-- NOTE If you don't need categories, you could use the /category/_.vue file here instead -->
    <site-loading />
</template>

<script>
export default {
    beforeMount() {
        // Redirect to home page
        this.$router.replace("../../")
    },
}
</script>
