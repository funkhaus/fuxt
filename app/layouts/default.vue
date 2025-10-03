<template>
    <main :class="classes">
        <wp-seo />

        <global-header>
            <slot name="breadcrumbs">
                <!-- Default crumbs here -->
            </slot>
        </global-header>

        <slot />

        <!-- TODO: <client-only><wp-controls /> -->
    </main>
</template>

<script setup lang="ts">
const classes = computed(() => ['default-layout'])
</script>
