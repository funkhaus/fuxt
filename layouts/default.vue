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
    head() {
        return {
            bodyAttrs: {
                class: "default-theme"
            },
            titleTemplate: titleChunk => {
                return titleChunk
                    ? `${this.$store.state.siteMeta.title} - ${titleChunk}`
                    : this.$store.state.siteMeta.title
            },
            meta: [
                {
                    hid: "description",
                    name: "description",
                    property: "og:description",
                    content: this.$store.state.siteMeta.description
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: this.$store.state.siteMeta.themeScreenshotUrl
                },
                {
                    property: "og:url",
                    content: `${this.$store.state.siteMeta.host}${
                        this.$route.path
                    }`
                },
                {
                    property: "og:site_name",
                    content: this.$store.state.siteMeta.title
                },
                {
                    property: "og:type",
                    content: "website"
                }
            ]
        }
    },
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
                { "menu-opened": this.$store.state.menuOpened },
                { "is-scrolled": this.sTop > 0 },
                { "is-ssr": process.server }
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
            window.addEventListener("keydown", e => {
                switch (e && e.key) {
                    case "Escape":
                        this.$store.commit("CLOSE_MENU")
                        break
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
