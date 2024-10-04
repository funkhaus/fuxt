## TODO - Fuxt
- SEO defaults
- Port over default CSS vars
- Remove GQL features
- Get GA plugin working
- Make sure Preview's work
- Maybe this helps with better Gutenberg support now: https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-serialization-default-parser/

## TODO - Fuxt backend
- Update plugin manifest
    - Add https://wordpress.org/plugins/wp-openapi/
- Auto favicon step from WP-Easy into fuxt-backend
- Hide WP Open API menu item for non-Devs

## Questions for Conrawl
- How the do we get `postcss-custom-media` actually working in components, and `/assets/css/*` files?
- Only ship Storybook when needed
    - Only use runtime compiler when Storybook is used
- Only ship Nuxt DevTools when in Dev mode
- What's the answer to trailingSlash for existing page URLs (not just NuxtLinks)
- Can we use array/object syntax for htmlClasses somehow?
- Should we have a plugin for app setup code, or put in app.vue?
- Am I using ref()'s correct in my browser.client.ts plugin? Seems like too many watch() are needed.
- Enable PostCSS inline comments `// comment`

## TODO - Base Components
- WpImage
- WpMenu
- VideoStage
- Gutenberg (LLM help?)
- WpSeo
- WpControls
- WpLink
- SplitText

## Usage Notes
- Install VS Code plugin "ESlint"