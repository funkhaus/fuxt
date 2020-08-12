import WpMenu from "@/components/WpMenu"
import API from "@/static/db.json"

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

/*
TODO: Get $fetch() working with storybook
export const Fetch = () => ({
    components: { WpMenu },
    data() {
        return {
            items: API.menuItems.nodes,
        }
    },
    template: `<wp-menu location="MAIN_MENU" />`,
})
*/
