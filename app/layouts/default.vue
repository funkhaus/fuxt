<template>
    <main :class="classes">
        <wp-seo :fetch-data="!shopRoute" />

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
const route = useRoute()
const classes = computed(() => ['default-layout'])
const shopRoute = computed(() => route.path.startsWith('/shop'))
</script>
