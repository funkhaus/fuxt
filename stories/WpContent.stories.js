import WpContent from "@/components/WpContent"

const Html =
    "<p><h2>This is Wp Content</h2>Yep, I remember. They came in last at the Olympics, then retired to promote alcoholic beverages! I wish! It&#8217;s a nickel. I usually try to keep my sadness pent up inside where it can fester quietly as a mental illness.</p><p>check out this list:</p><ul><li>One</li><li>Two</li><li>Three</li></ul> <p>Why did you bring us here? Okay, I like a challenge. I am the man with no name, Zapp Brannigan! I am the man with no name, Zapp Brannigan! It&#8217;s a T. It goes &#8220;tuh&#8221;.</p> <p>Actually, that&#8217;s still true. Is that a cooking show? Hi, I&#8217;m a naughty nurse, and I really need someone to talk to. $9.95 a minute. Daddy Bender, we&#8217;re hungry.</p> <p>And why did &#8216;I&#8217; have to take a cab? I&#8217;m a thing. Take me to your leader! I&#8217;ve been there. My folks were always on me to groom myself and wear underpants. What am I, the pope? Fry! Stay back! He&#8217;s too powerful!</p>"

export default {
    title: "@WpComponents / WpContent",
}

export const Default = () => ({
    components: { WpContent },
    data() {
        return {
            html: Html,
        }
    },
    template: `<wp-content :html="html" />`,
})
