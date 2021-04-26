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
        // TODO Is it possible to lazy load the entire ~/components/gutenberg directory?
        GutenbergHeading: () => import("~/components/gutenberg/Heading"),
        GutenbergParagraph: () => import("~/components/gutenberg/Paragraph"),
        GutenbergImage: () => import("~/components/gutenberg/Image"),
        GutenbergQuote: () => import("~/components/gutenberg/Quote"),
        GutenbergList: () => import("~/components/gutenberg/List"),
        GutenbergEmbed: () => import("~/components/gutenberg/Embed"),
        GutenbergColumns: () => import("~/components/gutenberg/Columns"),
        GutenbergColumn: () => import("~/components/gutenberg/Column"),
        GutenbergFreeform: () => import("~/components/gutenberg/Freeform"),
        GutenbergSpacer: () => import("~/components/gutenberg/Spacer"),
        GutenbergGallery: () => import("~/components/gutenberg/Gallery")
    },
    props: {
        blocks: {
            type: Array,
            default: []
        }
    },
    computed: {
        lowerCaseComponents() {
            // Get all local component names as lowercase
            let lowerCaseComponents = Object.keys(
                this.$options.components || {}
            )
            return lowerCaseComponents.map(str => {
                return str.toLowerCase()
            })
        },
        parsedBlocks() {
            // This function is used to shape the data coming out of WP-GQL
            // to better match the basic prop inputs of each component

            return this.blocks.map(obj => {
                // Start by flatterning the "attributes"
                let output = {
                    ...obj,
                    ...obj.attributes,
                    id: _get(obj, "attributes.wpId", ""),
                    class: `gutenberg-block ${_get(
                        obj,
                        "attributes.wpClasses",
                        ""
                    )}`
                }

                // Make name fit with Vue component syntax
                output.componentName = `${this.getBlockName(obj.name)}`

                // Shape any props as needed
                switch (output.componentName) {
                    case "gutenberg-image":
                        output.image = _get(output, "mediaItem.nodes[0]", {})
                        break

                    case "gutenberg-gallery":
                        output.images = _get(output, "mediaItems.nodes", [])
                        break
                }

                // Remove un-needed elements from object and return
                delete output.attributes
                delete output.wpId
                return output
            })
        }
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
        }
    }
}
</script>

<style lang="scss" scoped>
:where(.wp-gutenberg) {
    // Margins above/below main section blocks and text blocks
    --unit-margin-large: 100px;
    --unit-margin-small: 20px;

    // Used on two consecutive blocks to have them close the margin
    --unit-margin-negative: -80px;

    // Gaps on the side of a block (between browser edge)
    --unit-gutter: var(--unit-gap, 40px);

    // Max width of blocks: Section, headings/quotes, paragraph/lists.
    --unit-max-width-large: var(--unit-max-width, 1600px);
    --unit-max-width-medium: 1000px;
    --unit-max-width-small: 700px;

    > .gutenberg-block {
        margin: var(--unit-margin-large) auto;
        max-width: var(--unit-max-width-large);
        padding: 0 var(--unit-gutter);

        box-sizing: border-box;

        &:first-child {
            margin-top: 0;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }

    // Sections - These elements get a large margin between them
    .gutenberg-columns {
        + .gutenberg-columns {
            margin-top: var(--unit-margin-negative);
        }
        .gutenberg-column {
            margin: 0 var(--unit-margin-small);
        }
        .gutenberg-heading,
        .gutenberg-paragraph {
            max-width: 370px;
            padding: 0;
            margin: var(--unit-margin-small) auto;

            + .gutenberg-heading {
                margin-top: 0;
            }
            + .gutenberg-paragraph {
                margin-top: 0;
            }
        }
    }
    .gutenberg-gallery {
        padding: 0 calc(var(--unit-margin-small) / 2);
        box-sizing: border-box;

        /deep/ .image {
            padding: 0 calc(var(--unit-margin-small) / 2);
            margin: calc(var(--unit-margin-small) / 2) 0;
        }
    }
    .gutenberg-image {
        padding: 0;

        + .gutenberg-image {
            margin-top: var(--unit-margin-negative);
        }
    }
    .gutenberg-quote {
        max-width: var(--unit-max-width-medium);
        text-align: center;
        font-size: 40px;

        /deep/ {
            p {
                margin: var(--unit-margin-small) auto;
                font-weight: 300;
            }
            .citation {
                font-size: 50%;
                font-weight: 500;
            }
        }
    }

    // Text elements - these have smaller margins between them
    .gutenberg-heading {
        max-width: var(--unit-max-width-medium);

        // Size
        &.is-h1 {
            font-size: 40px;
        }
        &.is-h2 {
            font-size: 30px;
        }
        &.is-h3 {
            font-size: 20px;
        }
        &.is-h4 {
            font-size: 10px;
        }

        + .gutenberg-heading {
            margin-top: var(--unit-margin-negative);
        }
        + .gutenberg-paragraph {
            margin-top: var(--unit-margin-negative);
        }
    }
    .gutenberg-paragraph,
    .gutenberg-list {
        max-width: var(--unit-max-width-small);
        margin: var(--unit-margin-small) auto;
    }
}
</style>
