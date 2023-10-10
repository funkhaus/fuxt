import { data as API } from "~/stories/mock-api.json"

export default {
    title: "WpComponents / WpMenu"
}

export const Default = () => ({
    data() {
        return {
            items: API.menu.menuItems.nodes
        }
    },
    template: `<wp-menu :items="items" />`
})

export const Fetch = () => ({
    template: `<wp-menu name="Main Menu" />`
})
