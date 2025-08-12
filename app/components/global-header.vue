<template>
    <header class="global-header">
        <nuxt-link to="/">
            <svg-logo-funkhaus class="logo" />
        </nuxt-link>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.global-header {
    padding: 20px;
    background-color: lightgray;

    .logo {
        width: 300px;
    }
}
</style>
