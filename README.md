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

1.  If you are using a `@font-face` font, then you will need to put the font files in `/static/fonts`
1.  Then define the CSS in `/styles/fonts.css`
1.  Set the names of the font families in `/web-font-loader.js`
1.  Uncomment the `fonts.css` CSS line in `nuxt.config.js`
1.  Uncomment the `web-font-loader.js` plugin line in `nuxt.config.js`

For Typekit or google fonts, please see the [webfontloader](https://github.com/typekit/webfontloader) documentation.

## TODO list

TODO Boilerplate improvements:

-   Install eslint and es-lint vue plugin, config like MPC. Maybe use Buetify instead?
-   For GA tracking, query WP-GQL for token and set it on client before mounted. See: https://stackoverflow.com/questions/54013335/nuxt-js-how-to-include-an-asynchronous-script-in-the-nuxt-config-js-file
-   Src-set on attachments (waiting on WP-GQL)
-   Video URL, focus and color meta on posts/pages/attachments/menu items
-   Set nuxt.config.js title prop from server using: https://stackoverflow.com/questions/54013335/nuxt-js-how-to-include-an-asynchronous-script-in-the-nuxt-config-js-file
-   Open Graph tags in head. This might help: https://stackoverflow.com/questions/51962020/vue-nuxt-async-meta-tags-generation
-   Get preview URLs working: https://gist.githubusercontent.com/resir014/28bd011b909c44cb9a9bcfce8a63b0b6/raw/7e388ba7bd21c6981769c95f972865b0622c926a/functions.php
-   Get it working on Heroku
-   Add CI pipeline (TBD what we are testing for)
-   Wire up UPDATE_REFERRAL_ROUTE into router. Maybe this helps: https://github.com/funkhaus/vuehaus/blob/9adbf3cdcde3426455848fcce19f8f5d1d2c18c0/src/utils/router.js#L51-L77
-   Commit isScrolled to store
-   Get SCSS functions for type settings working: https://github.com/funkhaus/stackhaus/issues/1
-   Setup Router scroll-behavior: https://router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling
-   Remove Dev ID, figure out way to lock slug on certain pages (don't auto update on page title change too).
-   Setup ACF site options panel, move GA tracking code and frontend/backend URL settings to that panel. See: https://www.advancedcustomfields.com/resources/options-page/
-   Get a meta field added to admin dashboard for Frontend URL. Needs both staging and production.
-   Remove WP Graph QL Meta from required plugins. Replace with ACF plugin, not required though.
-   Animate scrollToTop on router: https://nuxtjs.org/api/pages-scrolltotop/

TODO Components we need:

-   SVG inline images. Seems to me this might help: https://github.com/visualfanatic/svg-to-vue or this: https://github.com/visualfanatic/vue-svg-loader
-   Wp-content
-   Wp-menu
-   Responsive-Image (better version, should play videos too)
-   Split Text

TODO GQL queries we need:

-   Site settings (title, staging/production urls perhaps, GA number etc...)
-   Try to use slug/name for everything
-   Current page, and all its child pages (for grid pages).
-   Get menu by location
-   Get all Posts
-   Category, and it’s posts (featured image, title, id). Need parent category name and description too.
-   Current post (title, featured image, content)
-   Anytime we need a featured image we need (src-set, caption, height, width, video-url, title)
-   Get page ancestors pages (to build breadcrumbs)
-   Get next/prev post or page (for pagination)
