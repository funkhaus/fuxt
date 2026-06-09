// plugins/directives.js
import intersectionObserver from '~/directives/v-intersect'
import inView from '~/directives/in-view'

export default defineNuxtPlugin((nuxtApp) => {
    // Register the directives globally
    nuxtApp.vueApp.directive('intersection-observer', intersectionObserver)
    nuxtApp.vueApp.directive('in-view', inView)
})
