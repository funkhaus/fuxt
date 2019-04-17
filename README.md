# stackhaus

New Graph QL powered frontend tech stack. Built on Nuxt, using Apollo.

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

## Fonts

This theme uses [webfontloader](https://github.com/typekit/webfontloader) for font loading.

If you are using a `@font-face` font, then you will need to put the font files in `/static/fonts`, then define the CSS in `/styles/fonts.css`, the names of the font families in `/web-font-loader.js`, and uncomment the `fonts.css` CSS line and the `web-font-loader.js` plugin line in the `nuxt.config.js` file.

For Typekit or google fonts, please see the [webfontloader](https://github.com/typekit/webfontloader) documentation.

## TODO list

TODO Boilerplate improvements:

-   For GA tracking, query WP-GQL for token and set it on client before mounted. See: https://stackoverflow.com/questions/54013335/nuxt-js-how-to-include-an-asynchronous-script-in-the-nuxt-config-js-file
-   Src-set on attachments
-   Meta on posts/pages/attachments/menu items
-   Set nuxt.config.js title prop from server using: https://stackoverflow.com/questions/54013335/nuxt-js-how-to-include-an-asynchronous-script-in-the-nuxt-config-js-file
-   Open Graph tags in head. This might help: https://stackoverflow.com/questions/51962020/vue-nuxt-async-meta-tags-generation
-   Get preview URLs working: https://gist.githubusercontent.com/resir014/28bd011b909c44cb9a9bcfce8a63b0b6/raw/7e388ba7bd21c6981769c95f972865b0622c926a/functions.php
-   Get a meta field added to admin dashboard for Frontend URL. Needs both staging and production.
-   Get it working on Heroku
-   Add CI pipeline (TBD what we are testing for)
-   Wire up UPDATE_REFERRAL_ROUTE into router. Maybe this helps: https://github.com/funkhaus/vuehaus/blob/9adbf3cdcde3426455848fcce19f8f5d1d2c18c0/src/utils/router.js#L51-L77
-   Commit isScrolled to store

TODO Components we need:

-   SVG inline images!
-   Wp-content
-   Wp-menu
-   Responsive-Image (better version, should play videos too)
-   Split Text

TODO GQL queries we need:

-   Site settings (title, staging/production urls perhaps, GA number etc...)
-   For everything we need slug/name and encoded id generally
-   Current page, and all its child pages (for grid pages).
-   Get menu by name
-   Get all Posts
-   Category, and it’s posts (featured image, title, id). Need parent category name and description too.
-   Current post (title, featured image, content)
-   Anytime we need a featured image we need (src-set, caption, height, width, video-url, title)
-   Get page ancestors pages (to build breadcrumbs)
-   Get next/prev post or page (for pagination)
