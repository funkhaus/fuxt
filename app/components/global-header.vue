<template>
    <header class="global-header">
        Header goes here
        <slot />

        <h2>Testing</h2>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.global-header {
    background-color: #333;

    @media (--lt-phone) {
        background-color: red;
    }
}
</style>
