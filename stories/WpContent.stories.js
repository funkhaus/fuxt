import WpContent from "~/components/WpContent"

// This is a good example of how you can make up your own mock data if you nned
const HTML =
    '<p><img src="https://mock-api.funkhaus.us/wp-content/uploads/2021/01/Screen-Shot-2021-01-04-at-5.08.52-PM-2560x1444.png" alt="" /></p>\n<h3>While perusing, scrolling, and reading around the web recently, we came across a sentiment about and definition of design that stuck with us.<br />\nDesign is bridging the gap between information and understanding.<br />\n</h3>\n<p>Design in any form has the uncanny ability to communicate and represent a thought, feeling, and story that we may not even be able to articulate with words, whether it be a graphic that graces a museum wall, detailed interiors that enliven a room, or, in our case, the entirety of a brand that comes to life through a website and beyond.</p>\n'

export default {
    title: "WpComponents / WpContent",
}

export const Default = () => ({
    components: { WpContent },
    data() {
        return {
            html: HTML,
        }
    },
    template: `<wp-content :html="html" />`,
})

export const EnabledStyles = () => ({
    components: { WpContent },
    data() {
        return {
            html: HTML,
        }
    },
    template: `<wp-content :html="html" :enable-styles="true" class="entry" />`,
})
