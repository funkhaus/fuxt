<template>
    <header class="global-header">
        Header goes here

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


    @media (--lt-phone) {
        background-color: red;

        h2 {
            color: yellow;
        }
    }
}
</style>
