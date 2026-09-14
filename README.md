# fuxt

A complete Headless WordPress tech stack built on Nuxt 4.

Works best with the [fuxt-backend](https://github.com/funkhaus/fuxt-backend) WordPress theme and included WordPress optimized components.

Built by [Funkhaus](http://funkhaus.us/). We normally host on [Flywheel](https://share.getf.ly/n02x5z).

PS: The name Fuxt comes from [Funkhaus](https://funkhaus.us) and Nuxt. [It's provocative](https://www.youtube.com/watch?v=_eRRab36XLI).

## Features

- TODO

## Page headings (the `<h1>`)

Every page gets exactly one `<h1>`, rendered by `<global-page-heading>` in the layout — not by
pages or components. It is visually hidden but present in the HTML and the accessibility tree,
because designs normally carry their own styled title. So:

- **Inside components, any title-looking element is an `<h2>` or lower.** Never an `<h1>`.
- The text is derived automatically from the route's WordPress entity — new pages need no wiring.
- Give a route an exact, server-rendered heading when the slug is not a good one, or when the
  route has no WordPress entity behind it (an archive, `/search/`):

  ```js
  definePageMeta({ pageHeading: 'News' })
  ```

- If a page's design genuinely shows a real `<h1>`, let it own it and stand the layout's down:

  ```js
  definePageMeta({ pageHeading: false })
  ```

See `app/composables/usePageHeading.ts` for the resolution order and why the WordPress title is
applied after mount.

## `llms.txt`

`/llms.txt` is served from the frontend by `server/routes/llms.txt.ts`, which re-serves the file
Yoast SEO generates at the WordPress site root. It is a markdown index of the site's pages and
post types, written to be read by LLMs and agents.

Nothing to wire up per fork. Turn the feature on in **Yoast SEO → Settings → Site features →
llms.txt** and the route starts serving it; leave it off and `/llms.txt` is a plain 404. The same
applies if WordPress is unreachable or password-walled — the route fails to a 404 and never leaks
an HTML error page onto a `.txt` URL.

The links *inside* the file are Yoast's, built from WordPress's Home URL. If they point at the CMS
domain instead of the frontend, that is the same misconfiguration breaking Yoast's canonicals and
sitemap — fix Home URL in WordPress rather than rewriting the output here.

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
