# fuxt

A complete Headless WordPress tech stack built on Nuxt, using Apollo.

Works best with the [fuxt-backend](https://github.com/funkhaus/fuxt-backend) WordPress theme and included WordPress optimized components.

We also have some [Shopify components under development here](https://github.com/funkhaus/shophaus). Headless Shopify and WordPress together finally!

Built by [Funkhaus](http://funkhaus.us/).

PS: The name Fuxt comes from [Funkhaus](https://funkhaus.us) and Nuxt. [It's provocative](https://www.youtube.com/watch?v=_eRRab36XLI).

## Features

-   Auto installs any WordPress plugin dependencies
-   WordPress Previews and Drafts work with regular WordPress logins
-   GraphQL and Apollo powered API
-   [ACF](https://www.advancedcustomfields.com/) first class citizen
-   Supports only the classic editor (#guttenbergsucks)
-   Works with shortcodes and oEmbeds
-   Google Analytics plugin baked in, pulls from WordPress dashboard (requires [ACF Pro](https://www.advancedcustomfields.com/pro/))
-   Includes lots of components for common WordPress needs
    -   wp-content (supports oEmbed and shortcodes)
    -   wp-menu and wp-menu-item (supports sub-menus!)
    -   wp-image (uses WordPress generated src-sets and much more!)
    -   wp-link (handles parsing WordPress permalinks)
-   Built in webfontloader for fast font loading
-   Auto imports SVGs from `@/assets/svgs`
-   Auto imports root components from `@/components`
-   Includes GQL email mutation to send email from frontend
-   Lots of common functions to save you time!
    -   Mobile swipe events baked in
    -   Device detection baked in
    -   Solve for [100vh on mobile](https://stackoverflow.com/questions/58886797/how-to-access-the-real-100vh-on-ios-in-css) baked in
    -   Tracks window dimensions and scroll top position
-   Prettier and ESLint built in for nice looking code
-   Lodash baked in

## Build Setup

**This is just a Nuxt site, so it builds and deploys like any other Nuxt project.**

Works best with the [fuxt-backend](https://github.com/funkhaus/fuxt-backend) WordPress theme as the backend.

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

## Theme Config - WordPress as a headless CMS

1.  Install `fuxt-backend` theme into WordPress [from here](https://github.com/funkhaus/fuxt-backend). Rename theme directory to the site name appended with `-backend-2019`, so `example-backend`. Also change the theme name to the same in `style.css`.
    1.  Disable privacy mode on WordPress host (if applicable)
    1.  Install promoted Plugins
    1.  Go to Settings > General, and set the "Site Address (URL)" to be the frontend URL. Often times you'll have to email your host (Flywheel) to get them to allow this field to be edited.
    1.  Save Permalinks in the WordPress dashboard (WP-GQL requires this) to the `Post name` option.
        1.  Use the `<wp-link>` component to handle parsing the WordPress URL's into Nuxt friendly paths.
    1.  Define menu locations in `/functions/theme-config.php`.
    1.  If you want to use ACF, there are some default fields we recommend, you can find the file to import from the theme directory `/acf/` or [here](https://github.com/funkhaus/fuxt-backend/tree/master/acf).
        1.  One of these field groups is Site Options, which allows Google Analytics to work. You need ACF Pro installed for this to work.
        1.  See below for instructions on how to remove the ACF Pro requirement.
1.  Rename your `.env.example` to `.env` and config `DEFAULT_ENDPOINT` to be the GraphQL endpoint from the WordPress you installed above.
    1.  If you are using an endpoint that is protected by Basic Authentication, like the Flywheel staging sites, then you should set the `BASIC_API_TOKEN` var in the `.env` file too. You can find out what your token should be by just going to the endpoint in your browser, successfully entering the username/password combination, then use your browsers Network Inspector to see what the Request headers are, and find the `Authorization` one. That is the token you need.

### How to use without ACF Pro

ACF Pro is used for Site Options, which by default is how we store the Google Analytics tracking codes. If you don't want to use ACF Pro, then you will need to do the following:

    1.  In `~/gql/queries/SiteSettings.gql` delete the entire `acfSettings` block.
    1.  To get Google Analytics tracking working, change line 5 of `~/plugins/google-gtag.client.js` to pull the codes from your preferred place. I recommend you put them in the Vuex store someplace.

## Fonts

This theme uses [webfontloader](https://github.com/typekit/webfontloader) for font loading.

1.  If you are using a `@font-face` font, then you will need to put the font files in `/static/fonts`
1.  Then define the CSS in `/styles/fonts.css`
1.  Set the names of the font families in `/web-font-loader.js`
1.  Uncomment the `fonts.css` CSS line in `nuxt.config.js`
1.  Uncomment the `web-font-loader.client.js` plugin line in `nuxt.config.js`

For Typekit or google fonts, please see the [webfontloader](https://github.com/typekit/webfontloader) documentation.

## Menus

Fuxt has built in SSR friendly menus. To use them, you first need to define menu locations in WordPress. This can be done in the `/functions/theme-config.php` file in the `fuxt-backend` WordPress theme. We have some boilerplate code in the `register_custom_nav_menus()` function.

1. Define menu locations in your WordPress theme in `functions/theme-config.php`.
1. Assign menus to those menu-locations in the WordPress dashboard.
1. Use the `<wp-menu>` component like so: `<wp-menu location="Location Name"/>`.

## SVGs

The theme includes global loading of all SVGs in the `/assets/svgs` directory. This means you can use any SVG by using a component with the filename prepended by `svg`. For example `<svg-filename class="svg"/>` if your SVG was located at `/assets/svgs/filename.svg`.

If you want to use an SVG in your CSS file, you can't place it in `/assets/svgs/`, you should put it in `/assets` like this `/assets/filename.svg` and use it like this in your CSS: `background-image: url("~assets/filename.svg")`.

## 100vh on iOS

To address the [infamous 100vh on iOS bug/feature](https://medium.com/@susiekim9/how-to-compensate-for-the-ios-viewport-unit-bug-46e78d54af0d), this theme has a CSS var called `--real-100vh` that is updated from a function in `/layouts/default.vue` called `set100vhVar()`.

You can simply use the CSS `height: var(--real-100vh); transition: height 0.4s ease-in-out;` and it will work across all devices smoothly.

## Referrer object

The store contains an object `this.$store.state.referrer` that is populated by the last `from` route object that was displayed. This is controlled by the `/middleware/referrer.js` file. This is useful if you want to display a custom back button on a page.

## Linting

This theme has perfect linting for Vue/GQL/JS/SCSS/CSS and HTML using Prettier and ESLint. The ruleset is the Vue style guide "Recommended" spec.

Behind the scenes, the workflow is this: Ugly code > Prettier > ESLint > Nice code!

The idea is that Prettier formats things like CSS and GQL nicely, and ESLint goes last and does everything else. This allows us to config ESLint to the Vue specs (Prettier has little config options by design). So that is what the .eslintrc.js file is for.

In your code editor, you'll want to install a Prettier plugin ([VS Code](https://github.com/prettier/prettier-vscode) or [Atom](https://github.com/prettier/prettier-atom)), and set the "ESLint Integration" to `true` and "Format on Save" to `true`. The settings for "prettier-eslint” should have a toggle for "Run Prettier Last", you want that set to `false`. We need ESLint to run last, this ensures the Vue Recommended specs get priority, not Prettier's specs.

The 4 `devDependencies` installed in the package are "eslint", "eslint-plugin-vue", "prettier" and "prettier-eslint". The "prettier" plugin is not required as most editor plugins will use a default version they ship with, although we have more control over the version of Prettier if we include it in the package file, so we did just to be safe. It also means it would run the same server side or client side if you do that as part of CI. "prettier-eslint" is used to integrate "prettier" and "eslint" together, and get them running one after the other.

### Emailing

The backend theme includes a `sendEmail` mutation. Simply uncomment `gql_register_email_mutation` action in `/functions/gql-functions.php`.

The mutation maps to the [wp_mail() function](https://developer.wordpress.org/reference/functions/wp_mail/), so please read that for a description of required inputs.

The mutation comes with a basic form of anti-spam protection. The input `trap` must equal the same as the `clientMutationId`. With GraphQL, the `clientMutationId` is a unique identify and you can set it to whatever you like.

The `Log Emails` plugin is handy to install, to track what emails are getting sent. You can get it [here](https://wordpress.org/plugins/log-emails/).

So for example:

```
mutation MyMutation {
  sendEmail(
      input: {
          clientMutationId: "12345",
          to: ["example@example.com"],
          message: "Email body here",
          subject: "Subject text here",
          trap: "12345",
          headers: ["From: site@example.com"] # Will default to WordPress@{your-domain.com}
       }
    ) {
        to
        message
        subject
        sent
  }
}
```

## Basic authentication

This theme has built in basic authentication (.htaccess) protection. It is disabled by default, you can config this under the `basic` section of `nuxt.config.js`. The default username is `funkhaus` and the default password is `12345`. It's highly recommended that you change these defaults. Behind the scenes we use the [nuxt-basic-auth-module](https://www.npmjs.com/package/nuxt-basic-auth-module).

Note: If you start getting this error after enabling basic auth "Cannot read property toLowerCase of undefined" clear local storage. See [https://github.com/nuxt/nuxt.js/issues/6116](https://github.com/nuxt/nuxt.js/issues/6116)

## Google Analytics using `this.$gtag()`

If you have ACF Pro installed, you will get a Site Options panel. In the Site Options you will be able to set Google Analytics codes.

By default page views are tracked, but you can track anything you want using `this.$gtag()` in a component or page. See: https://developers.google.com/analytics/devguides/collection/gtagjs

```
    this.gtag('event', <action>, {
      'event_category': <category>,
      'event_label': <label>,
      'value': <value>
    });
```

## Store tracking breakpoint size

By default, on nuxtServerInit a user agent detect will happen and set the `state.breakpoint` to equal mobile or desktop. This is also set in `Default.vue` as well. We do this to try to make sure that SSR is at least close to the client as possible. We use a combination of `@nuxtjs/device` and window width to do this.

## Shortcodes

This theme unpacks WordPress shortcods into Vue components. You need to register the shortcodes in your WordPress theme in the `/functions/shortcods.php` file [here](https://github.com/funkhaus/fuxt-backend/blob/master/functions/shortcodes.php). There are a few common ones we have built, that you can uncomment the `//add_shortcode` lines to turn on.

Common shortcodes we've included:

### Gallery

`[gallery]` that builds a grid of images. Designed to work with `<responsive-image>` and FocusHaus.

`[gallery ids="123,456,789" columns="2"]`

### Columns

`[columns]` shortcode that can be used to layout elements into columns.

```
[columns columns="2"]
    [column]Left text[/column]
    [column]Right text, or an <img> even![/column]
[/columns]
```

**For this to work, you must also turn on `[column]` shortcode, but this does not require any Vue code to work.**

### SVG images

`[svg]` That maps to an SVG from `~/assets/svgs` using the `name` prop.

```
[svg name="arrow-icon"]
```

### Swipe Events

To enable swipe event listeners on a given element use the function `initSwipeEvents` located in `utils/tools.js`.

The parameters to the `initSwipeEvents` function are el the element which event listeners will be added to and deltaMin the minimum swipe distance required to fire a swipe event. The default value of deltaMin is 80.

The events emitted by this function are `swipeUp`, `swipeDown`, `swipeRight`, `swipeLeft`

An example of a component:

```
import { initSwipeEvents } from "~/utils/tools"

<template>
    <div
        @swipe-right="foo"
        @swipe-left="bar"
        @swipe-up="foo"
        @swipe-down="bar"
    />
</template>
<script>
export default {
     mounted() {
         // 80 is the default, you can leave it empty normally
         initSwipeEvents(this.$el, 80)
     }
}
</script>
```

## Funkhaus guidlines

**This is advice for Funkhaus team only.**

### Repo naming conventions

The frontend theme repo should be name based on the URL of the site it's for, dropping any TLDs and appended with `-frontend` or `-backend`. So if it was for `funkhaus.us`, the repo would be named `funkhaus-frontend`, and the backend theme repo would be `funkhaus-backend`.

### Basic Auth

All Funkhaus sites that under development and accessible to the internet need to have `BASIC_AUTH_ENABLED` set to `"true"`.

### Deploying

You are simply deploying a Nuxt project, so any way you can deploy Nuxt will work with this boilerplate. Below I explain how we do it at Funkhaus using Heroku.

**We recommended using CloudFlare for your DNS, it's free plan is enough to do everything you need.**

#### Creating Heroku Pipeline

When you have your app set up, you'll want to add it to a project specific pipeline.

1.  Name your pipeline `{project-name}-nuxt`
1.  Add the corresponding app to production or staging pipelines.
1.  Make sure you transfer ownership to Funkhaus if you're part of the team.

Follow the instructions here [pipelines](https://devcenter.heroku.com/articles/pipelines)

#### Deploying to Heroku

If you're comfortable with the command line, install the [heroku cli tools](https://devcenter.heroku.com/articles/heroku-cli).

Otherwise you can do it all through the website Dashboard too.

1.  Login in to [heroku](https://heroku.com)
1.  Create an App.
    1.  To set up different environments (staging / production) follow the instructions [here](https://medium.com/@ivanpilot/deploying-your-app-on-heroku-with-staging-and-production-environments-17156870983e)
    1.  Name it `{project-name}-production`
    1.  After beta you will create `{project-name}-staging`
1.  Make sure you transfer ownership to Funkhaus if you're part of the team.
1.  For your Heroku app, go to "Deploy" and connect it to the GitHub repo.
    1.  Generally it's best to not enable automatic deploy, and to use the "Manual deploy" button at the bottom.
    1.  For production apps, we should always deploy form `master` branch.
1.  For your Heroku app, go to "Settings" and define all your `Config Vars`.
    1. Follow the instructions [here](https://nuxtjs.org/faq/heroku-deployment/) to set up your required Nuxt config vars.
    1. Be sure to add the same config vars that are in you `.env` file too.

#### Go Live!

1.  Prep Nuxt to go live.
    1.  Disable Basic Auth on servers `.env` file or settings panel.
    1.  Set the Apollo endpoints to be the new domain names. Probably `https://api.your-site.com/graphql`.
    1.  If you're using Shopify, `https://shop.your-site.com/api/{version number here}/graphql.json`. You may want to use a `.env` for these, it helps when dealing with staging setups.
    1.  Be sure to turn off Privacy mode in Flywheel.
1.  In Heroku, add your custom domain name to the App. [See here](https://devcenter.heroku.com/articles/custom-domains]). Note the "DNS Target" Heroku gives you, it should be some funny names and a random string like `space-balls-12345drewish.herokudns.com`.
1.  Turn on SSL in Heroku using the "Automated Certificate Management" (this only works if you're hosting on a paid Heroku plan, which Funkhaus has).
1.  In CloudFlare, click "+ Add Site" (top left of screen).
    1.  When it asks for DNS entries, you'll want to set two CNAME's pointing to the "DNS Target" shown in Heroku (mentioned in Step 1). One CNAME for `www` and one CNAME set to `@`, which CloudFlare will then auto apply "CNAME Flattening", which is good. [See here for more](https://thoughtbot.com/blog/set-up-cloudflare-free-ssl-on-heroku).
    1.  Add an A-RECORD for your API backend, which is the WordPress install hosted on Flywheel. Generally you want this to be `api.your-site.com`.
1.  Setting up `www.` and force SSL redirects in CloudFlare. You want two rules:
    1. Click 'Page Rules'.
    1. Click 'Add a rule'.
    1. Match the URL to `*www.your-site.com/*`.
        1. Select 'Forwarding URL' from the dropdown menu.
        1. Choose '301 - Permanent Redirect'.
        1. Set the redirect URL to `https://your-site.com/$2`.
    1. Match the URL to `http://your-site.com/*`
        1. Select 'Forwarding URL' from the dropdown menu.
        1. Choose '301 - Permanent Redirect'.
        1. Set the redirect URL to `https://your-site.com/$1`.
1.  In Flywheel, add a new primary domain, this should match the CloudFlare entry you set above, probably `api.your-site.com`. When adding the domain ensure that the "Also add www" checkbox is not selected.
    1.  Setup the free SSL on Flywheel, and then make sure "Force SSL" is turned on under Advanced.
    1.  Be sure to turn off Privacy mode in Flywheel.
1.  At this point, you will probably want to redirect your nameservers to point to CloudFlare. Probably these are close to `homer.ns.cloudflare.com` and `marge.ns.cloudflare.com`.
1.  Confirm that CloudFlare's SSL mode is set to 'Flexible' under 'SSL/TLS' tab. You need to do this, as it conflicts with the auto SSL setup on Flywheel.
1.  If the site uses Shopify, you'll need to "Add an existing domain". Probably this will be `shop.your-site.com`.
    1.  In CloudFlare set a CNAME for `shop.your-site.com` to point to `shops.myshopify.com`.
    1.  **You do not need to setup an A-RECORD if you only want the shop to be on a sub-domain.**
1.  Login to Heroku, and on the "Deploy" tab on the production app, click the "Manual Deploy" button!

## TODO list

Boilerplate improvements:

-   Document the included WordPress components
-   Document the fuxt-backend theme auto-installs
-   Change and document deployment to Netlify and generated sites.
-   Get this working using generated routes: https://github.com/nuxt-community/sitemap-module
    -   Perhaps add this for better SEO: https://developers.google.com/search/docs/guides/intro-structured-data or https://www.npmjs.com/package/nuxt-jsonld
-   Make the backend URL be protocol agnostic, this requires fixing wp-link and maybe wp-menu-item?
-   Would be nice to have a class added to body when the router is in the middle of something. See: https://stackoverflow.com/a/46063580/503546 Maybe use apollo global loader?
-   Get SCSS functions for type settings working: https://github.com/funkhaus/fuxt/issues/1
-   Maybe at some point, update Google Tracking with this. Waiting on it to get better: https://github.com/nuxt-community/gtm-module
-   Separate out common styles into SCSS imports
-   Get this working (and playing nicely with Prettier). Should have --fix set to true. https://github.com/nuxt-community/stylelint-module
-   Audit packages. Do we still need core-js and node-fetch?
-   Redo the way we load SVGs? Maybe use same package as Facotry
-   Update to work with new Nuxt auto component importer
-   Document Netlify deployment
