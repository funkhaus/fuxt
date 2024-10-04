<template>
    <header class="global-header">
        Header goes here
        <slot />

        <h2>
            Testing
        </h2>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import "~/assets/css/media.css";

.global-header {
    background-color: #333;

    border: var(--lt-phone);

    @media (--lt-phone) {
        background-color: red;

        h2 {
            color: yellow;
        }
    }
}
</style>
