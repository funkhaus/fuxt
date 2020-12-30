import WpImage from "~/components/WpImage"
import API from "~/stories/mock-api.json"

export default {
    title: "WpComponents / WpImage",
}

export const Default = () => ({
    components: { WpImage },
    data() {
        return {
            image: API.image,
        }
    },
    template: `<wp-image :image="image" />`,
})

export const ImageWithVideo = () => ({
    components: { WpImage },
    data() {
        return {
            image: API.images[1],
        }
    },
    template: `<wp-image :image="image" />`,
})

export const ImageFullBleed = () => ({
    components: { WpImage },
    data() {
        return {
            image: API.images[1],
        }
    },
    template: `<wp-image :image="image" mode="fullbleed"/>`,
})
