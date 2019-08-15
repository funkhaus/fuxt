    # stackhaus

New Graph QL powered frontend tech stack. Built on Nuxt, using Apollo. Works best with the [stackhuas-backend](https://github.com/funkhaus/stackhaus-backend) WordPress theme.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Theme Config

1.  Install promoted Plugins
1.  Save Permalinks in the WordPress dashboard (WP-GQL requires this)
1.  Define image sizes and menus in /functions/theme-config.php

## Fonts

This theme uses [webfontloader](https://github.com/typekit/webfontloader) for font loading.

1.  If you are using a `@font-face` font, then you will need to put the font files in `/static/fonts`
1.  Then define the CSS in `/styles/fonts.css`
1.  Set the names of the font families in `/web-font-loader.js`
1.  Uncomment the `fonts.css` CSS line in `nuxt.config.js`
1.  Uncomment the `web-font-loader.client.js` plugin line in `nuxt.config.js`

For Typekit or google fonts, please see the [webfontloader](https://github.com/typekit/webfontloader) documentation.

## Menus

Stackhaus has built in SSR friendly menus. To use them, you first need to define menu locations in WordPress. This can be done in the `/functions/theme-config.php` file in the `stackhaus-backend` WordPress theme. We have some boilerplate code in the `register_custom_nav_menus()` function.

1. Define menu locations in your WordPress theme in `functions/theme-config.php`.
1. Assign menus to those menu-locations in the WordPress dashboard.
1. Define your menu locations in `store/index.js`, see the `nuxtServerInit()` function for commented out boilerplate.
1. That is it! Your menus will now be in the Vuex store under `$store.menus.locations`.

## Linting

This theme has perfect linting for Vue/GQL/JS/SCSS/CSS and HTML using Prettier and ESLint. The ruleset is the Vue style guide "Recommended" spec.

Behind the scenes, the workflow is this: Ugly code > Prettier > ESLint > Nice code!

The idea is that Prettier formats things like CSS and GQL nicely, and ESLint goes last and does everything else. This allows us to config ESLint to the Vue specs (Prettier has little config options by design). So that is what the .eslintrc.js file is for.

In your code editor, you'll want to install a Prettier plugin ([VS Code](https://github.com/prettier/prettier-vscode) or [Atom](https://github.com/prettier/prettier-atom)), and set the "ESLint Integration" to `true` and "Format on Save" to `true`. The settings for "prettier-eslint” should have a toggle for "Run Prettier Last", you want that set to `false`. We need ESLint to run last, this ensures the Vue Recommended specs get priority, not Prettier's specs.

The 4 `devDependencies` installed in the package are "eslint", "eslint-plugin-vue", "prettier" and "prettier-eslint". The "prettier" plugin is not required as most editor plugins will use a default version they ship with, although we have more control over the version of Prettier if we include it in the package file, so we did just to be safe. It also means it would run the same server side or client side if you do that as part of CI. "prettier-eslint" is used to integrate "prettier" and "eslint" together, and get them running one after the other.

# Deploying to heroku

Make sure you have [heroku cli tools installed](https://devcenter.heroku.com/articles/heroku-cli).

Login in to [heroku](https://heroku.com)

Create a new app

Follow the instructions here:[nuxt heroku deployment](https://nuxtjs.org/faq/heroku-deployment/)

## Basic authentication

This theme has built in basic authentication (.htaccess) protection. It is enabled by default (because generally you'll want this on when deploying to public staging sites like we do at Funkhaus), you can config this under the `basic` section of `nuxt.config.js`. The default username is `funkhaus` and the default password is `12345`. It's highly recommended that you change these defaults. Behind the scenes we use the [nuxt-basic-auth-module](https://www.npmjs.com/package/nuxt-basic-auth-module).

> > > > > > > 76d2dcb66c3e7127d3f61cb5a8e983202682d76e

## TODO list

TODO Boilerplate improvements:

-   Get preview URLs working: https://gist.githubusercontent.com/resir014/28bd011b909c44cb9a9bcfce8a63b0b6/raw/7e388ba7bd21c6981769c95f972865b0622c926a/functions.php
-   Add CI pipeline (TBD what we are testing for)
-   Wire up UPDATE_REFERRAL_ROUTE into router. Maybe this helps: https://github.com/funkhaus/vuehaus/blob/9adbf3cdcde3426455848fcce19f8f5d1d2c18c0/src/utils/router.js#L51-L77
-   Get SCSS functions for type settings working: https://github.com/funkhaus/stackhaus/issues/1
-   Setup Router scroll-behavior: https://router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling
-   Setup ACF site options panel, move GA tracking code and frontend/backend URL settings to that panel. See: https://www.advancedcustomfields.com/resources/options-page/
-   Get a meta field added to admin dashboard for Frontend URL. Needs both staging and production.
-   Animate scrollToTop on router: https://nuxtjs.org/api/pages-scrolltotop/
-   Add tools.js file to /utils. Maybe take date and link functions from MPC?
-   Document analytics and how `this.$gtag` works for custom events
-   Fix ACF auto-import of default fields
-   Get this working: https://github.com/nuxt-community/sitemap-module
