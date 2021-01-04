import ShortcodeGallery from "~/components/shortcode/Gallery"
import { data as API } from "~/stories/mock-api.json"

export default {
    title: "WpComponents / ShortcodeGallery",
}

export const Default = () => ({
    data() {
        return {
            images: data.images.nodes,
        }
    },
    components: { ShortcodeGallery },
    template: `<shortcode-gallery :images="images"/>`,
})

export const ThreeColumns = () => ({
    data() {
        return {
            images: data.images.nodes,
        }
    },
    components: { ShortcodeGallery },
    template: `<shortcode-gallery :images="images" columns="3"/>`,
})
