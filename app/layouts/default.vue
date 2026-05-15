<template>
    <main :class="classes">
        <wp-seo />

        <cursor-follow />

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

<style>
.default-layout {
    min-height: var(--unit-100vh);

    .block-red {
        background-color: #c0392b;
        color: white;

        aspect-ratio: 16 / 9;
        max-width: 400px;
        width: 100%;
        padding: 16px;
    }
}
</style>
