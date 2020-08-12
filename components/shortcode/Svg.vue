<script>
export default {
    props: {
        url: {
            type: String,
            default: "",
        },
    },
    async fetch() {
        const response = await fetch(this.url)
        this.svgData = await response.text()
    },
    data() {
        return {
            svgData: "",
        }
    },
    computed: {
        parsedSvg() {
            // TODO Run through SVGO, maybe add a class for styling, preserve viewBox
            return this.svgData || ""
        },
    },
    render(h) {
        return h({
            template: this.parsedSvg,
        })
    },
}
</script>
