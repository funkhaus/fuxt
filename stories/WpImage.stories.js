import WpImage from "~/components/WpImage"
import API from "~/stories/mock-api.json"

export default {
    title: "WpComponents / WpImage",
}

export const Default = () => ({
    components: { WpImage },
    data() {
        return {
            image: API.images.nodes[0],
        }
    },
    template: `<wp-image :image="image" />`,
})

export const ImageWithVideo = () => ({
    components: { WpImage },
    data() {
        return {
            image: API.images.nodes[1],
        }
    },
    template: `<wp-image :image="image" />`,
})

export const ImageFullBleed = () => ({
    components: { WpImage },
    data() {
        return {
            image: API.images.nodes[1],
        }
    },
    template: `<wp-image :image="image" mode="fullbleed"/>`,
})
