// Define any compoenet here that is used globally
import Vue from 'vue'
import SiteHamburger from '~/components/site/Hamburger.vue'

const components = { SiteHamburger }

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})
