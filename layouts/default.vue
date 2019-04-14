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
import _throttle from 'lodash/throttle'
import _kebabCase from 'lodash/kebabCase'

export default {
    data() {
        let output = {
            winHeight: 0,
            winWidth: 0,
            sTop: 0
        }
        if (process.client) {
            output.winHeight = window.innerHeight
            output.winWidth = window.innerWidth
        }
        return output
    },
    computed: {
        classes() {
            return [
                'container',
                'main',
                `breakpoint-${this.breakpoint}`,
                `route-${_kebabCase(this.$route.name)}`,
                { scrolled: this.sTop > 0 },
                { 'menu-opened': this.$store.state.site.menuOpened }
            ]
        },
        breakpoint() {
            let breakpoint = this.winWidth >= 750 ? 'desktop' : 'mobile'
            if (this.$store.state.breakpoint != breakpoint) {
                this.$store.commit('site/SET_BREAKPOINT', breakpoint)
            }
            return breakpoint
        }
    },
    mounted() {
        window.addEventListener('resize', _throttle(this.onResize, 30))
        window.addEventListener('scroll', _throttle(this.onScroll, 10))

        // Monitor keydown
        window.addEventListener('keydown', key => {
            // Close menu on esc key
            if (key && key.keyCode == 27) {
                this.$store.commit('CLOSE_MENU')
            }
        })
    },
    methods: {
        onResize() {
            this.winWidth = window.innerWidth
            this.winHeight = window.innerHeight

            this.$emit('throttled.resize')
        },
        onScroll() {
            this.sTop = window.pageYOffset || document.documentElement.scrollTop

            this.$emit('throttled.scroll')
        }
    }
}
</script>

<style lang="scss"></style>
