<template>
    <div
        class="site-hamburger"
        @click="toggleMenu()"
    >
        <div class="line line-1" />
        <div class="line line-2" />
        <div class="line line-3" />
    </div>
</template>

<script>
export default {
    methods: {
        toggleMenu() {
            if (this.$store.state.menuOpened) {
                this.$store.commit("CLOSE_MENU")
            } else {
                this.$store.commit("OPEN_MENU")
            }
        }
    }
}
</script>

<style lang="scss">
.site-hamburger {
    background-color: red;
    height: 20px;
    width: 20px;
    padding: 20px;
    position: fixed;
    top: 20px;
    right: 20px;

    // Breakpoints
    // @media #{$lt-tablet} {
    //     .hamburger {
    //         display: block;
    //     }
    // }
}
</style>
