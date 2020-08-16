<template>
    <div
        class="global-hamburger"
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
                this.$store.commit("SET_MENU", false)
            } else {
                this.$store.commit("SET_MENU", true)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.global-hamburger {
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
