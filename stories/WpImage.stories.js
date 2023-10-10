import { data as API } from "~/stories/mock-api.json"

export default {
    title: "WpComponents / WpImage"
}

export const Default = () => ({
    data() {
        return {
            image: API.images.nodes[0]
        }
    },
    template: `<wp-image :image="image" />`
})

export const ImageWithVideo = () => ({
    data() {
        return {
            image: API.images.nodes[1]
        }
    },
    template: `<wp-image :image="image" />`
})

export const ImageFullBleed = () => ({
    data() {
        return {
            image: API.images.nodes[1]
        }
    },
    template: `<wp-image :image="image" mode="fullbleed"/>`
})
