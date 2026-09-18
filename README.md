# fuxt

A complete Headless WordPress tech stack built on Nuxt 4.

Works best with the [fuxt-backend](https://github.com/funkhaus/fuxt-backend) WordPress theme and included WordPress optimized components.

Built by [Funkhaus](http://funkhaus.us/). We normally host on [Flywheel](https://share.getf.ly/n02x5z).

PS: The name Fuxt comes from [Funkhaus](https://funkhaus.us) and Nuxt. [It's provocative](https://www.youtube.com/watch?v=_eRRab36XLI).

## Features

- TODO

## SEO

SEO is driven by the [Yoast SEO](https://yoast.com) WordPress plugin, exposed through [fuxt-api](https://github.com/funkhaus/fuxt-api) (`>= 0.1.5`) as an optional `seo` field on `/post`.

- `<wp-seo />` in the layout renders the head for the current route: title, description, robots, canonical, Open Graph, Twitter and Yoast's JSON-LD schema, falling back to the WordPress title/excerpt/featured image and then the site settings when Yoast has nothing.
- `useWpFetch(RequestType.POST, ...)` requests the `seo` field automatically and publishes the response to `usePageSeo()` when the request `uri` matches the current route. Pass `seo: true` to force this for a page whose fetch uri differs from its route (eg: `uri: '/home/'` on `/`), or `seo: false` for a `/post` request that is not the page's own entity (related posts, teasers).
- Editors control titles, descriptions, social images, canonicals and noindex per page in Yoast. Never work around design needs with content hacks such as blank titles or dashes as line breaks; add fields or hide UI in code instead.

### Sitemap, robots and llms.txt

- `/sitemap.xml` lists the routes Nitro's prerender crawler reaches from `/`, so every section must be linked from server-rendered HTML: gate navigation with `v-show`, never `v-if`, and don't server-redirect a landing route that is the only path into a section.
- `/robots.txt` comes from `@nuxtjs/robots`; `/sitemap_index.xml` redirects to `/sitemap.xml` because Yoast links that name.
- `/llms.txt` is proxied from the file Yoast generates at the WordPress root. Enable it under Yoast → Settings → Site features; it regenerates weekly, or on toggling the feature.
- WordPress "Site Address (URL)" must be the frontend domain: Yoast builds canonicals, `og:url` and schema from it.

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

# build Storybook for production
$ npx nuxt storybook build

# generate static project
$ npm run generate

```

## Documentation

For detailed explanation on how things work, checkout [the wiki](https://github.com/funkhaus/fuxt/wiki).
