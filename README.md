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

TODO Boilerplate improvements:

-   Get web font loader working: https://github.com/typekit/webfontloader#custom
-   For GA tracking, query WP-GQL for token and set it on client before mounted
-   Src-set on attachments
-   Meta on posts/pages/attachments/menu items
-   ACF from everything?
-   Open Graph tags in head
-   Get preview URLs working: https://gist.githubusercontent.com/resir014/28bd011b909c44cb9a9bcfce8a63b0b6/raw/7e388ba7bd21c6981769c95f972865b0622c926a/functions.php
-   Get a meta field added to admin dashboard for Frontend URL. Needs both staging and production.

TODO Components we need:

-   Wp-content
-   Wp-menu
-   Responsive-Image (better version, should play videos too)
-   Split Text

TODO GQL queries we need:

-   For everything we need slug/name and id generally
-   Current page, and all its child pages (for grid pages).
-   Get menu by name
-   News grid?
-   Category and it’s posts (featured image, title, id). Need parent category name and description too.
-   Current post (title, featured image, content)
-   Anytime we need a featured image we need (src-set, caption, height, width, video-url, title)
-   Get page ancestors pages (to build breadcrumbs)
