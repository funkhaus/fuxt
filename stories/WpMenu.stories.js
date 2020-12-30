import WpMenu from "~/components/WpMenu"
import API from "~/stories/mock-api.json"

export default {
    title: "WpComponents / WpMenu",
}

export const Default = () => ({
    components: { WpMenu },
    data() {
        return {
            items: API.menuItems.nodes,
        }
    },
    template: `<wp-menu :items="items" />`,
})

export const Fetch = () => ({
    components: { WpMenu },
    template: `<wp-menu location="MAIN_MENU" />`,
})
