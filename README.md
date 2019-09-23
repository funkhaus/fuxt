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

1.  Install prompted Plugins
1.  Save Permalinks in the WordPress dashboard (WP-GQL requires this)
1.  Define image sizes and menus in `/functions/theme-config.php`

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

## Going Live!

We recommended using CloudFlare for your DNS, it's free plan is enough to do everything you need.

1.  Prep Nuxt to go live.
    1.  Disable Basic Auth in `nuxt.config.js`
    1.  Set the Apollo endpoints to be the new domain names. Probably `https://api.your-site.com/graphql` and if you're using Shopify, `https://shop.your-site.com/api/{version number here}/graphql.json`. You may want to use a `.env` for these, it helps when dealing with staging setups later.
    1.  If you want the site to be HTTPS (you should), you'll probably want to install the `Redirect SSL` module in Nuxt [from here](https://github.com/nuxt-community/redirect-ssl).
    1.  Be sure to turn off Privacy mode in Flywheel.
1.  In Heroku, add your custom domain name to the App. [See here](https://devcenter.heroku.com/articles/custom-domains]). Note the "DNS Target" Heroku gives you, it should be some funny names and a random string like `space-balls-12345drewish.herokudns.com`.
1.  Turn on SSL in Heroku using the "Automated Certificate Management" (this only works if you're hosting on a paid Heroku plan, which Funkhaus has).
1.  In CloudFlare, click "+ Add Site" (top left of screen).
    1.  When it asks for DNS entries, you'll want to set two CNAME's pointing to the "DNS Target" shown in Heroku (mentioned in Step 1). One CNAME for `www` and one CNAME set to `@`, which CloudFlare will then auto apply "CNAME Flattening", which is good. [See here for more](https://thoughtbot.com/blog/set-up-cloudflare-free-ssl-on-heroku).
    1.  Add an A-RECORD for your API backend, which is on Flywheel. Generally you want this to be `api.your-site.com`.
    1.  You do not need to do anything for SSL in CloudFlare, Heroku handles it.
1.  In Flywheel, add a new primary domain, this should match the CloudFlare entry you set above, probably `api.your-site.com`.
    1.  Setup the free SSL on Flywheel, and then make sure "Force SSL" is turn on.
    1.  Be sure to turn off Privacy mode in Flywheel.
1.  At this point, you will probably want to redirect your nameservers to point to CloudFlare. Probably these are `ed.ns.cloudflare.com` and `marge.ns.cloudflare.com`.
1.  If the site uses Shopify, you'll need to "Add an existing domain". Probably this will be `shop.your-site.com`.
    1.  In CloudFlare set a CNAME for `shop.your-site.com` to point to `shops.myshopify.com`.
    1.  **You do not need to setup an A-RECORD if you only want the shop to be on a sub-domain.**

## Basic authentication

This theme has built in basic authentication (.htaccess) protection. It is disabled by default, you can config this under the `basic` section of `nuxt.config.js`. The default username is `funkhaus` and the default password is `12345`. It's highly recommended that you change these defaults. Behind the scenes we use the [nuxt-basic-auth-module](https://www.npmjs.com/package/nuxt-basic-auth-module).

## Google Analytics using `this.$gtag`

By default we track page views, but you can track anything you want using `this.$gtag()`. See: https://developers.google.com/analytics/devguides/collection/gtagjs

```
    this.gtag('event', <action>, {
      'event_category': <category>,
      'event_label': <label>,
      'value': <value>
    });
```

## TODO list

TODO Boilerplate improvements:

-   Get preview URLs working: https://gist.githubusercontent.com/resir014/28bd011b909c44cb9a9bcfce8a63b0b6/raw/7e388ba7bd21c6981769c95f972865b0622c926a/functions.php
-   Add CI pipeline (TBD what we are testing for)
-   Wire up UPDATE_REFERRAL_ROUTE into router. Maybe this helps: https://github.com/funkhaus/vuehaus/blob/9adbf3cdcde3426455848fcce19f8f5d1d2c18c0/src/utils/router.js#L51-L77
-   Get SCSS functions for type settings working: https://github.com/funkhaus/stackhaus/issues/1
-   Setup ACF site options panel, move GA tracking code and frontend/backend URL settings to that panel. See: https://www.advancedcustomfields.com/resources/options-page/
-   Get a meta field added to admin dashboard for Frontend URL. Needs both staging and production.
-   Animate scrollToTop on router: https://nuxtjs.org/api/pages-scrolltotop/
-   Add tools.js file to /utils. Maybe take date and link functions from MPC?
-   Document analytics and how `this.$gtag` works for custom events
-   Fix ACF auto-import of default fields
-   Get this working: https://github.com/nuxt-community/sitemap-module
-   Add ACF and ACF gql plugin to auto installer. Make not required.
-   Fix \$lt-tablet being used in shortcode-gallery. Throws errors on build.
-   Perhaps add this for better SEO: https://developers.google.com/search/docs/guides/intro-structured-data or https://www.npmjs.com/package/nuxt-jsonld
-   Make the backend URL be protocol agnostic, this requires fixing smart link and maybe wp-menu-item?
-   Add a redirect for site-url.com/wp-admin (and /admin) to redirect to API login page
-   Refactor nuxtServerInit to use Promise.all() to all requests in parallel
-   Figure out a way to have better staging site URLs for Funkhaus (hide Heroku)
-   A WordPress function to generate all post/page/category/tags/CPT routes. Maybe this helps: https://wordpress.org/plugins/list-urls/
-   A better FocusHaus/auto caption/color plugin. Yes image names help SEO: https://yoast.com/image-seo/#name
-   Use Nuxt-Device on server side to set breakpoint
-   Refactor Responsive Image component to use <picture> element and IntersectionObserver?
-   Build a InfinateScroll component that uses IntersectionObserver
-   Build a <click-to-load-more> component that handles pagination loading (maybe pass in GQL query?)
-   Take Focal Point scripts from ICM and make a WordPress plugin, then add to auto-plugin installer
-   Move GQL files into own /gql folder and import fragments
