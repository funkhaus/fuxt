import ShortcodeSvg from "~/components/shortcode/Svg"
import { data as API } from "~/stories/mock-api.json"

export default {
    title: "WpComponents / ShortcodeSvg",
}

export const Default = () => ({
    components: { ShortcodeSvg },
    data() {
        return {
            logos: API.logos.nodes,
        }
    },
    template: `<shortcode-svg :url="logos[0].sourceUrl" />`,
})
