<template>
    <div class="wp-seo">
        <!-- TODO WP SEO title and site discription goes here -->
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Site Title Goes here'
    // ogTitle: 'My Amazing Site',
    // description: 'This is my amazing site, let me tell you all about it.',
    // ogDescription: 'This is my amazing site, let me tell you all about it.',
    // ogImage: 'https://example.com/image.png',
    // twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.wp-seo {
    display: none;
}
</style>
