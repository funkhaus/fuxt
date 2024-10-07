<template>
    <header class="global-header">
        Header goes here

        <wp-menu
            name="Main Menu"
        />

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
    background-color: lightgray;

    border: var(--lt-phone);

    @media (--lt-phone) {
        background-color: red;

        h2 {
            color: yellow;
        }
    }
}
</style>
