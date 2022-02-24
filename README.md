# fuxt

A complete Headless WordPress tech stack built on Nuxt, using GraphQL.

Works best with the [fuxt-backend](https://github.com/funkhaus/fuxt-backend) WordPress theme and included WordPress optimized components.

We also have some [Shopify components under development here](https://github.com/funkhaus/shophaus). Headless Shopify and WordPress together finally!

Built by [Funkhaus](http://funkhaus.us/). We normally host on [Flywheel](https://share.getf.ly/n02x5z).

PS: The name Fuxt comes from [Funkhaus](https://funkhaus.us) and Nuxt. [It's provocative](https://www.youtube.com/watch?v=_eRRab36XLI).

## Features

-   Optimzed for Netlify deployment. Includes custom WordPress plugin for manual and auto deploys.
-   WordPress Previews and Drafts work with regular WordPress logins. `Preview` token in requests to work with CDNs.
-   Includes a WordPress admin bar on frontend for logged in users.
-   Supports Gutenberg blocks on frontend and backend!
-   Includes [Nuxt Storybook module](https://storybook.nuxtjs.org/)!
-   Includes custom module for nuxtGenerateInit. Populate the store once at the beginning of Generate!
-   Optimized [fuxt-backend](https://github.com/funkhaus/fuxt-backend) WordPress theme:
    -   Auto installs any WordPress plugin dependencies
    -   GraphQL powered API using [Nuxt GraphQL Request](https://www.npmjs.com/package/nuxt-graphql-request)
    -   [ACF](https://www.advancedcustomfields.com/) first class citizen
    -   Includes GQL email mutation to send email from frontend via backend
-   Google Analytics plugin baked in, pulls from WordPress dashboard (requires [ACF Pro](https://www.advancedcustomfields.com/pro/))
-   Includes lots of components for common WordPress needs
    -   wp-gutenberg (supports custom frontend gutenberg components)
    -   wp-menu and wp-menu-item (supports sub-menus!)
    -   wp-image (uses WordPress generated src-sets and much more!)
    -   wp-link (handles parsing WordPress permalinks)
-   Built in webfontloader for fast font loading
-   Uses Nuxt Auto Components
-   Lots of common functions to save you time!
    -   Mobile swipe events baked in
    -   Solve for [100vh on mobile](https://stackoverflow.com/questions/58886797/how-to-access-the-real-100vh-on-ios-in-css) baked in
    -   Tracks window dimensions and scroll top position into Vuex
    -   IP Stack region detection built in (requires API key)
    -   Lodash baked in
    -   Prettier and ESLint built in for nice looking code

## Build Setup

**This is just a [Nuxt site](https://nuxtjs.org), so it builds and deploys like any other Nuxt project.**

Works best with the [fuxt-backend](https://github.com/funkhaus/fuxt-backend) WordPress theme as the backend.

**First step:** Duplicate and rename `.example.env` to `.env`. Define any vars environment needed there.

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# serve with hot reload Storybook at localhost:3003
$ npm run storybook

# build for production and launch server
$ npm run build
$ npm start

# build Stroybook for production
$ npx nuxt storybook build

# generate static project
$ npm run generate

```

## Documentation

For detailed explanation on how things work, checkout [the wiki](https://github.com/funkhaus/fuxt/wiki).
