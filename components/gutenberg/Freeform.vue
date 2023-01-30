<template lang="html">
    <div
        class="gutenberg-freeform margin-section"
        v-html="parsedHtml"
    />
</template>

<script>
import { autop } from "@wordpress/autop"

export default {
    props: {
        html: {
            type: String,
            default: ""
        }
    },
    computed: {
        parsedHtml() {
            return autop(this.html)
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-freeform {
}
</style>
