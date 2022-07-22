import Vue from "vue"

/*
 * Due to a bug with Storybook not showing DevTools, this is a workaround to force DevTools for all Dev enviroments.
 * The side effect is that this makes it impossible to overide DevTools to show in production enviroments.
 * I will be removing this plugin once it is fixed in Storybook.
 *
 * SEE https://github.com/nuxt-community/storybook/issues/403
 */
export default function ({ isDev }) {
    Object.assign(Vue.config, { devtools: isDev })
}
