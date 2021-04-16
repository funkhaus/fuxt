<template lang="html">
    <div class="wp-gutenberg">
        <component
            :is="block.componentName"
            v-for="(block, i) in parsedBlocks"
            v-if="componentIsRegistered(block.name)"
            :key="i"
            v-bind="block"
        />
    </div>
</template>

<script>
// Helpers
import _get from "lodash/get"

export default {
    components: {
        GutenbergHeading: () => import("~/components/gutenberg/Heading"),
        GutenbergParagraph: () => import("~/components/gutenberg/Paragraph"),
        GutenbergImage: () => import("~/components/gutenberg/Image"),
        GutenbergQuote: () => import("~/components/gutenberg/Quote"),
        GutenbergList: () => import("~/components/gutenberg/List"),
        GutenbergGallery: () => import("~/components/gutenberg/Gallery"),
        GutenbergEmbed: () => import("~/components/gutenberg/Embed"),
        GutenbergColumns: () => import("~/components/gutenberg/Columns"),
    },
    props: {
        blocks: {
            type: Array,
            default: [],
        },
    },
    computed: {
        lowerCaseComponents() {
            // Get all local component names as lowercase
            let lowerCaseComponents = Object.keys(
                this.$options.components || {}
            )
            return lowerCaseComponents.map((str) => {
                return str.toLowerCase()
            })
        },
        parsedBlocks() {
            // This function is used to shape the data coming out of WP-GQL
            // to better match the basic prop inputs of each component

            return this.blocks.map((obj) => {
                // Start by flatterning the "attributes"
                let output = {
                    ...obj,
                    ...obj.attributes,
                }

                // Make name fit with Vue component syntax
                output.componentName = this.getBlockName(obj.name)

                // Shape any props as needed
                switch (output.componentName) {
                    case "gutenberg-image":
                        output.image = _get(output, "mediaItem.nodes[0]", {})
                        break
                }

                return output
            })
        },
    },
    methods: {
        componentIsRegistered(name = "") {
            // Get requested component name as all lowercase no dashes
            let componentName = this.getBlockName(name)
                .toLowerCase()
                .replace("-", "")

            // Check that component has been registered
            return this.lowerCaseComponents.includes(componentName)
        },
        getBlockName(name = "") {
            return `gutenberg-${name.replace("core/", "").toLowerCase()}`
        },
    },
}
</script>

<style lang="scss" scoped>
.wp-gutenberg {
    // TODO Default styles here
}
</style>
