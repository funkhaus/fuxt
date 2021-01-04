import ShortcodeSvg from "~/components/shortcode/Svg"

export default {
    title: "WpComponents / ShortcodeSvg",
}

export const Default = () => ({
    components: { ShortcodeSvg },
    template: `<shortcode-svg url="https://mock-api.funkhaus.us/wp-content/uploads/2021/01/award-oscars.svg" />`,
})
