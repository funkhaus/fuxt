export default {
    title: "WpComponents / WpLink"
}

export const Default = () => ({
    template: `<wp-link to="/contact">This is an internal wp-link</wp-link>`
})

export const InternalLinkTargetBlank = () => ({
    template: `<wp-link to="/contact" target="_blank">This is an internal wp-link (but opens in new tab)</wp-link>`
})

export const ExternalLink = () => ({
    template: `<wp-link to="http://funkhaus.us/" >This is an external wp-link</wp-link>`
})
