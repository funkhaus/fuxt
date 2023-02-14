<template>
    <main :class="classes">
        <!-- This helps with SEO -->
        <wp-seo />

        <global-hamburger />

        <nuxt-link
            to="/"
            class="fuxt-logo"
        >
            <svg-logo-funkhaus class="svg" />
        </nuxt-link>

        <wp-menu name="Main Menu" />

        <nuxt
            class="page"
            keep-alive
            :keep-alive-props="{ include: ['WpMenu', 'WpSeo'] }"
        />

        <!-- WordPress editor controls shown on frontend when logged in -->
        <client-only>
            <wp-controls />
        </client-only>
    </main>
</template>

<script>
// Helpers
import _kebabCase from "lodash/kebabCase"
import metaDefaults from "~/utils/metaDefaults"
import titleTemplate from "~/utils/titleTemplate"

// Components
import SvgLogoFunkhaus from "~/assets/svg/logo-funkhaus"

export default {
    components: {
        SvgLogoFunkhaus
    },
    data() {
        return {
            computedStyle: {}
        }
    },
    head() {
        return {
            htmlAttrs: {
                lang: "en",
                class: this.htmlClasses
            },
            titleTemplate(titleChunk) {
                return titleTemplate(this, titleChunk)
            },
            meta: metaDefaults(this)
        }
    },
    computed: {
        htmlClasses() {
            const classes = ["html", `theme-${this.themeName}`]
            classes.push(`route-${_kebabCase(this.$route.name || "error")}`)

            // This is how you add a class conditionally
            // this.foo && classes.push("foo")

            return classes.join(" ")
        },
        classes() {
            return [
                "layout",
                "layout-default",
                "main",
                `breakpoint-${this.$store.state.breakpoint}`,
                { "menu-opened": this.$store.state.menuOpened },
                { "is-scrolled": this.$store.state.sTop > 0 },
                `scrolling-${this.$store.state.scrollDirection}`
            ]
        },
        themeName() {
            let output = "default"
            switch (this.$route.name) {
                case "index":
                    output = "default"
                    break
            }
            return output
        }
    }
}
</script>

<style lang="scss">
.layout-default {
    .fuxt-logo {
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
