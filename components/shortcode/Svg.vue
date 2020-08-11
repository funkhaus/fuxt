<script>
export default {
    props: {
        url: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            svgData: ""
        }
    },
    computed: {
        parsedSvg() {
            // TODO Run through SVGO, maybe add a class for styling, preserve viewBox
            return this.svgData || ""
        }
    },
    async fetch() {
        const response = await fetch(this.url)
        this.svgData = await response.text()
    },
    render(h) {
        return h({
            template: this.parsedSvg
        })
    }
}
</script>
