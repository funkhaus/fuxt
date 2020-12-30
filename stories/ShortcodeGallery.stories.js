import ShortcodeGallery from "~/components/shortcode/Gallery"
import API from "~/stories/db.json"

export default {
    title: "WpComponents / ShortcodeGallery",
}

export const Default = () => ({
    data() {
        return {
            images: API.images,
        }
    },
    components: { ShortcodeGallery },
    template: `<shortcode-gallery :images="images"/>`,
})

export const ThreeColumns = () => ({
    data() {
        return {
            images: API.images,
        }
    },
    components: { ShortcodeGallery },
    template: `<shortcode-gallery :images="images" columns="3"/>`,
})
