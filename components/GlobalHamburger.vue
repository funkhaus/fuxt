<template>
    <div
        :class="classes"
        @click="toggleMenu()"
    >
        <div class="line line-1" />
        <div class="line line-2" />
        <div class="line line-3" />
    </div>
</template>

<script>
export default {
    props: {
        isOpened: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            return ["global-hamburger", { "is-opened": this.isOpened }]
        }
    },
    methods: {
        toggleMenu() {
            // Toggle menu state
            this.$emit("menu-opened", !this.isOpened)
        }
    }
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
    @media #{$lt-phone} {
        // .hamburger {
        //     display: block;
        // }
    }
}
</style>
