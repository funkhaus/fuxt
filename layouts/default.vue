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
    data() {
        let output = {
            winHeight: 0,
            winWidth: 0,
            sTop: 0,
            scrollManager: null,
        }

        // On client side, we have window so set the height/width
        if (process.client) {
            output.winHeight = window.innerHeight
            output.winWidth = window.innerWidth
        }
        return output
    },
    head() {
        return {
            htmlAttrs: {
                lang: "en",
            },
            bodyAttrs: {
                class: this.bodyClasses,
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
        classes() {
            return [
                "layout",
                "layout-default",
                "main",
                `breakpoint-${this.breakpoint}`,
                { "menu-opened": this.$store.state.menuOpened },
                { "is-scrolled": this.sTop > 0 },
                { "is-loading": this.$store.state.isLoading },
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
        },
    },
    mounted() {
        // Throttle common events
        this.scrollManager = setupScrollManager()
        this.scrollManager.add(this.onScroll)
        window.addEventListener("resize", _throttle(this.onResize, 8))

        // Trigger a resize and scroll to start, so data is correct on load
        this.onResize()
        this.onScroll()

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
        this.scrollManager.remove(this.onScroll)
    },
    methods: {
        onResize() {
            // Save window dimensions to store
            this.winWidth = window.innerWidth
            this.winHeight = window.innerHeight
            let dimensions = {
                height: this.winHeight,
                width: this.winWidth,
            }
            this.$store.commit("SET_WIN_DIMENSIONS", dimensions)
            this.set100vhVar()
        },
        onScroll() {
            // Save window scroll position to store
            this.sTop = window.pageYOffset || document.documentElement.scrollTop
            this.$store.commit("SET_S_TOP", this.sTop)
        },
        set100vhVar() {
            // This fixes the 100vh iOS bug/feature.
            // If less than most tablets, set var to window height.
            let value = ""
            if (this.winWidth <= 1024) {
                value = `${window.innerHeight}px`
            }
            document.documentElement.style.setProperty("--unit-100vh", value)
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
