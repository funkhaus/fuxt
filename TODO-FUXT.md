## TODO - Fuxt
- SEO defaults
- Port over default CSS vars
- Remove GQL features
- Get GA plugin working
- Make sure Preview's work
- Get nuxt-fonts working one day!
- Make Storybook working
- Add mock-api.json for easier component testing in Storybook
- add event listener for v-intersected directive (e.g. `@has-entered`)
- Figure out custom gutenberg blocks
- Maybe this helps with better Gutenberg support now: https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-serialization-default-parser/
- Get some sort of template and story snippit working: 
    - https://marketplace.visualstudio.com/items?itemName=exer7um.vue-3-vscode-snippets 
    - https://medium.com/@tbusser/vue-and-storybook-component-scaffolding-50df77b8d79d

## TODO - Fuxt backend
- Update plugin manifest
    - Add https://wordpress.org/plugins/wp-openapi/
- Auto favicon step from WP-Easy into fuxt-backend
- Hide WP Open API menu item for non-Devs

## Questions for Conrawl
- See GitHub issues on fuxt repo
- How to fetch more data from a watcher? $fetch vs useWpFetch()?

## TODO - Base Components
- WpImage
    - TODO Background color
    - TODO Focal points and color
    - TODO Only load video when coming into view
    - TODO Has-loaded of video?
- [x] WpMenu
- VideoStage
- Gutenberg (LLM help?)
- [x] WpSeo
- WpControls
- [x] WpLink (No longer needed actually, nuxt-link does it all now)
- SplitText

## Usage Notes
- Install VS Code plugin "ESlint"
- Document vueUse and lodash auto import usage
