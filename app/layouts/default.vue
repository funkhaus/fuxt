<template>
    <main :class="classes">
        <wp-seo />

        <global-header>
            <slot name="breadcrumbs">
                <!-- Default crumbs here -->
            </slot>

            <!-- TODO: global-hamburger -->
        </global-header>

        <!-- <header>
            <NuxtLink to="/blog">
                Blog
            </NuxtLink>

            <WpMenu
                name="Main Menu"
                title="Menu"
            />

            <div>
                Breakcrumbs:
                <slot name="breadcrumbs">
                    <Breadcrumbs :links="['A', 'B']" />
                </slot>
            </div>
        </header> -->

        <slot />

        <!-- TODO: <client-only><wp-controls /> -->
    </main>
</template>

<script setup lang="ts">
const classes = computed(() => ['default-layout'])
</script>
