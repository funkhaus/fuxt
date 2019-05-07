<!-- This will be our App.vue -->
<template>
    <main :class="classes">
        <!-- Header goes here -->
        <site-hamburger />

        <nuxt />
        <!-- Footer goes here -->
    </main>
</template>

<script>
import _throttle from "lodash/throttle"
import _kebabCase from "lodash/kebabCase"

export default {
    data() {
        let output = {
            winHeight: 0,
            winWidth: 0,
            sTop: 0
        }

        // On client side, we have window so set the height/width
        if (process.client) {
            output.winHeight = window.innerHeight
            output.winWidth = window.innerWidth
        }
        return output
    },
    computed: {
        classes() {
            return [
                "container",
                "main",
                `breakpoint-${this.breakpoint}`,
                `route-${_kebabCase(this.$route.name)}`,
                { scrolled: this.sTop > 0 },
                { "menu-opened": this.$store.state.menuOpened }
            ]
        },
        breakpoint() {
            let breakpoint = "desktop"

            switch (true) {
                case this.winWidth == 0:
                    breakpoint = "desktop"
                    break

                case this.winWidth <= 1024:
                    breakpoint = "mobile"
                    break

                default:
                    breakpoint = "desktop"
            }

            if (this.$store.state.breakpoint != breakpoint) {
                this.$store.commit("SET_BREAKPOINT", breakpoint)
            }
            return breakpoint
        }
    },
    mounted() {
        // Do these only on client side
        if (process.client) {
            // Throttle common events
            window.addEventListener("resize", _throttle(this.onResize, 30))
            window.addEventListener("scroll", _throttle(this.onScroll, 10))

            // Trigger a resize to start
            this.onResize()

            // Monitor keydown
            window.addEventListener("keydown", key => {
                // Esc key
                if (key && key.keyCode == 27) {
                    this.closeMenu()
                }
            })
        }
    },
    methods: {
        onResize() {
            this.winWidth = window.innerWidth
            this.winHeight = window.innerHeight
            this.$store.commit("SET_WIN_WIDTH", this.winWidth)
            this.$store.commit("SET_WIN_HEIGHT", this.winHeight)
        },
        onScroll() {
            this.sTop = window.pageYOffset || document.documentElement.scrollTop
            this.$store.commit("SET_S_TOP", this.sTop)
        },
        closeMenu() {
            this.$store.commit("CLOSE_MENU")
        }
    }
}
</script>

<style lang="scss"></style>
