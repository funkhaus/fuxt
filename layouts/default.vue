<template>
    <main :class="classes">
        <!-- This helps with SEO -->
        <wp-seo />

        <global-hamburger />

        <nuxt-link
            to="/"
            class="logo"
        >
            <svg-logo-funkhaus class="svg" />
        </nuxt-link>

        <wp-menu name="Main Menu" />

        <nuxt
            keep-alive
            :keep-alive-props="{ include: ['WpMenu', 'WpSeo'] }"
        />
    </main>
</template>

<script>
// Helpers
import _throttle from "lodash/throttle"
import _kebabCase from "lodash/kebabCase"
import decodeHtmlEntities from "~/utils/decodeHtmlEntities"
import setupScrollManager from "~/utils/setupScrollManager"

// Components
import SvgLogoFunkhaus from "~/assets/svg/logo-funkhaus"

export default {
    components: {
        SvgLogoFunkhaus,
    },
    head() {
        return {
            htmlAttrs: {
                lang: "en",
            },
            bodyAttrs: {
                class: this.bodyClasses,
                style: this.bodyStyles,
            },
            titleTemplate: (titleChunk) => {
                const title = decodeHtmlEntities(titleChunk)
                const site = decodeHtmlEntities(
                    this.$store.state.siteMeta.title
                )
                let output = site

                switch (true) {
                    case site == title:
                        output = site
                        break

                    case Boolean(title):
                        output = `${site} - ${title}`
                        break
                }

                return output
            },
            meta: [
                {
                    hid: "description",
                    name: "description",
                    property: "og:description",
                    content: this.$store.state.siteMeta.description,
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: this.$store.state.siteMeta.themeScreenshotUrl,
                },
                {
                    property: "og:url",
                    content: `${this.$store.state.siteMeta.frontendUrl}${this.$route.path}`,
                },
                {
                    property: "og:site_name",
                    content: this.$store.state.siteMeta.title,
                },
                {
                    property: "og:type",
                    content: "website",
                },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: this.$store.state.siteMeta.title,
                },
            ],
        }
    },
    computed: {
        bodyClasses() {
            const classes = ["body", "default-theme"]
            classes.push(`route-${_kebabCase(this.$route.name || "error")}`)

            // This is how you add a class conditionally
            process.server && classes.push("is-ssr")

            return classes.join(" ")
        },
        bodyStyles() {
            // This fixes the 100vh iOS bug/feature.
            // If less than most tablets, set var to window height.
            const winWidth = this.$store.state.winWidth
            let value = "100vh"
            if (winWidth <= 1024) {
                value = `${this.$store.state.winHeight}px`
            }
            return `--unit-100vh: ${value};`
        },
        classes() {
            return [
                "layout",
                "layout-default",
                "main",
                `breakpoint-${this.breakpoint}`,
                { "menu-opened": this.$store.state.menuOpened },
                { "is-scrolled": this.$store.state.stop > 0 },
                { "is-loading": this.$store.state.isLoading },
            ]
        },
        breakpoint() {
            const winWidth = this.$store.state.winWidth
            let breakpoint = "desktop"

            switch (true) {
                case winWidth == 0:
                    breakpoint = "desktop"
                    break

                case winWidth <= 1024:
                    breakpoint = "mobile"
                    break

                default:
                    breakpoint = "desktop"
            }

            return breakpoint
        },
    },
    watch: {
        breakpoint(newVal, oldVal) {
            if (newVal != oldVal) {
                this.$store.commit("SET_BREAKPOINT", newVal)
            }
        },
    },
    mounted() {
        // Throttle common events
        performantEvent("scroll").add()
        performantEvent("resize").add()
        window.addEventListener("performant-scroll", this.onScroll)
        window.addEventListener("performant-resize", this.onResize)

        // Trigger a resize and scroll to start, so data is correct on load
        this.onScroll()
        this.onResize()

        // Monitor keydown
        window.addEventListener("keydown", (e) => {
            switch (e && e.key) {
                case "Escape":
                    // Close menu on ESC press
                    this.$store.commit("SET_MENU", false)
                    break
            }
        })
    },
    destroyed() {
        performantEvent("scroll").remove()
        performantEvent("resize").remove()
        window.removeEventListener("performant-scroll", this.onScroll)
        window.removeEventListener("performant-resize", this.onResize)
    },
    methods: {
        onResize(event = {}) {
            const dimensions = {
                height: _get(event, "detail.winHeight", window.innerHeight),
                width: _get(event, "detail.winWidth", window.innerWidth),
            }
            this.$store.commit("SET_WIN_DIMENSIONS", dimensions)
        },
        onScroll(event = {}) {
            // Save window scroll position to store
            const sTop = _get(event, "detail.scrollTop", window.pageYOffset)
            this.$store.commit("SET_S_TOP", sTop)
        },
    },
}
</script>

<style lang="scss">
.layout-default {
    .logo {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
        margin: auto;
        width: 200px;
        text-align: center;
    }
}
</style>
