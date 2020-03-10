<template>
    <main :class="classes">
        <!-- This helps with SEO -->
        <h1
            v-if="$route.name == 'index'"
            id="site-title"
            v-html="$store.state.siteMeta.title"
        />
        <p
            v-if="$route.name == 'index'"
            id="tagline"
            v-html="$store.state.siteMeta.description"
        />

        <!-- Header would go  here -->

        <site-hamburger />

        <nuxt-link
            to="/"
            class="logo"
        >
            <svg-logo-funkhaus class="svg" />
        </nuxt-link>

        <nuxt />

        <!-- Footer goes here -->
    </main>
</template>

<script>
// Helpers
import _throttle from "lodash/throttle"
import _kebabCase from "lodash/kebabCase"
import { decodeHtmlEntities } from "~/utils/tools"

// Components
import siteHamburger from "~/components/site/Hamburger"

export default {
    components: {
        siteHamburger
    },
    head() {
        return {
            htmlAttrs: {
                lang: "en"
            },
            bodyAttrs: {
                class: "default-theme"
            },
            titleTemplate: titleChunk => {
                let title = decodeHtmlEntities(titleChunk)
                let site = decodeHtmlEntities(this.$store.state.siteMeta.title)
                return title ? `${site} - ${title}` : site
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
                    content: `${this.$store.state.siteMeta.frontendUrl}${this.$route.path}`
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
                `route-${_kebabCase(this.$route.name || "error")}`,
                { "menu-opened": this.$store.state.menuOpened },
                { "is-scrolled": this.sTop > 0 },
                { "is-ssr": process.server },
                { "is-loading": this.$store.state.isLoading }
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
        // Throttle common events
        window.addEventListener("resize", _throttle(this.onResize, 30))
        window.addEventListener("scroll", _throttle(this.onScroll, 10))

        // Trigger a resize to start
        this.onResize()

        // Monitor keydown
        window.addEventListener("keydown", e => {
            switch (e && e.key) {
                case "Escape":
                    // Close menu on ESC press
                    this.$store.commit("SET_MENU", FALS)
                    break
            }
        })
    },
    methods: {
        onResize() {
            // Save window dimensions to store
            this.winWidth = window.innerWidth
            this.winHeight = window.innerHeight
            let dimensions = {
                height: this.winHeight,
                width: this.winWidth
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
            document.documentElement.style.setProperty("--real100vh", value)
        }
    }
}
</script>

<style lang="scss">
.container {
    #site-title,
    #tagline {
        display: none;
    }
    .logo {
        position: absolute;
        top: 20px;
        left: 20px;
    }
}
</style>
