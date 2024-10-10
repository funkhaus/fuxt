<template>
    <header class="global-header">
        <nuxt-link to="/">
            <svg-logo-funkhaus class="logo" />
        </nuxt-link>

        <wp-menu
            name="Main Menu"
        />
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.global-header {
    background-color: lightgray;

    /* @media (--lt-phone) {
        Mobil styles go here
    } */
}
</style>
