<template>
    <h1
        v-if="heading"
        class="global-page-heading"
    >
        {{ heading }}
    </h1>
</template>

<script setup lang="ts">
/**
 * The document's single `<h1>`, for search engines and screen readers.
 *
 * Rendered once by the layout rather than by each page, so a new page needs no heading
 * wiring and two templates cannot disagree about who owns the `<h1>`. The text comes from
 * `usePageHeading()`; a page opts out with `definePageMeta({ pageHeading: false })` when
 * its design already shows a real one.
 *
 * Anything inside a component that looks like a page title should be an `<h2>` — see the
 * "Page headings" section of the README.
 */

// Consts
const heading = usePageHeading()
</script>

<style scoped>
/*
 * Visually hidden rather than `display: none`: designs normally carry their own styled
 * title (as an `h2`, inside a hero component), so a visible `h1` here would duplicate it.
 * Hiding it this way keeps it in the accessibility tree and in the crawled HTML, which is
 * the entire point — `display: none` and `visibility: hidden` remove it from both.
 *
 * No offsets, so it stays at its static position and cannot pull the page into a scroll.
 */
.global-page-heading {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}
</style>
