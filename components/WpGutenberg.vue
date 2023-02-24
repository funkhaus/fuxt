<template lang="html">
    <div class="wp-gutenberg">
        <component
            :is="block.componentName"
            v-for="(block, i) in parsedBlocks"
            v-if="block.isRegistered"
            :key="`gutenberg-block-${i}`"
            v-bind="block"
        />
    </div>
</template>

<script>
// Helpers
import _kebabCase from "lodash/kebabCase"

// Remove the block prefix's WordPress gives them
function getBlockName(name = "") {
    name = name.replace("core/", "").replace("acf/", "").toLowerCase()
    return `gutenberg-${name}`
}

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
        GutenbergGallery: () => import("~/components/gutenberg/Gallery"),
        GutenbergCover: () => import("~/components/gutenberg/Cover"),
        GutenbergHtml: () => import("~/components/gutenberg/Html"),
        GutenbergVideo: () => import("~/components/gutenberg/Video"),
        GutenbergButtons: () => import("~/components/gutenberg/Buttons")
    },
    props: {
        blocks: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        registeredComponents() {
            // Get all local component names as kebabCase, used to check if component is registered above
            let components = Object.keys(this.$options.components || {})

            return components.map((str) => {
                return _kebabCase(str)
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
                    id: obj.attributes?.wpId || "",
                    class: `gutenberg-block ${obj.attributes?.wpClasses || ""}`
                }

                // Make name fit with Vue component syntax
                output.componentName = `${getBlockName(obj.name)}`

                // Store boolean that Block has a registered in Vue component
                output.isRegistered = this.registeredComponents.includes(
                    output.componentName
                )

                // Flattern any ACF fields to the object
                if (obj.fields) {
                    output = { ...output, ...obj.fields }
                }

                // Flatten all inner blocks to array of attributes
                // TODO This should be recursive so it works for inner blocks inside inner blocks
                if (obj.innerBlocks?.length) {
                    output.innerBlocks = output.innerBlocks.map((obj) => {
                        return {
                            ...obj,
                            ...obj.attributes,
                            id: obj.attributes?.wpId || "",
                            class: obj.attributes?.wpClasses || ""
                        }
                    })
                }

                // Shape any props as needed
                switch (output.componentName) {
                    case "gutenberg-image":
                        output.image = output.mediaItem?.node || {}
                        break

                    case "gutenberg-gallery":
                        const imageBlocks = output.innerBlocks || []
                        output.images = imageBlocks.map((obj) => {
                            return obj.mediaItem?.node || {}
                        })
                        break

                    case "gutenberg-buttons":
                        // Parse JSON props on top level Buttons group
                        output.layout = JSON.parse(output.layout)

                        // Parse JSON props on child inner single Buttons
                        const buttonBlocks = output.innerBlocks || []
                        output.innerBlocks = buttonBlocks.map((obj) => {
                            return {
                                ...obj,
                                styles: JSON.parse(obj.styles)
                            }
                        })
                        break
                }

                // Remove un-needed elements from object and return
                delete output.attributes
                return output
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wp-gutenberg {
    // Margins above/below blocks
    --unit-margin-large: 40px; // Columns, Gallerys, Blockquotes...
    --unit-margin-small: 20px; // Everything except P, H{n} and lists.

    // Gaps on the side of a block (between browser edge)
    --unit-gutter: var(--unit-gap, 40px);

    // Max width of blocks
    --unit-max-width-large: 1400px; // Default, galleries, images, columns
    --unit-max-width-medium: 1080px; // Headings (center aligned), Blockquotes
    --unit-max-width-small: 800px; // Headings (left or right aligned), P, lists

    margin: var(--unit-margin-large) auto;
    display: flow-root;

    // Genric styles for all top level blocks
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

    // Generic margins and max-widths
    .margin-text {
        margin: var(--unit-margin-small) auto;
        max-width: var(--unit-max-width-small);
    }
    .margin-section {
        margin: var(--unit-margin-large) auto;
        max-width: var(--unit-max-width-large);
    }

    // Specific block styling below.
    .gutenberg-heading {
        line-height: 1.2;

        // Align
        &.align-center {
            max-width: var(--unit-max-width-medium);
        }

        // Size
        &.is-h1 {
            font-size: 80px;
        }
        &.is-h2 {
            font-size: 60px;
        }
        &.is-h3 {
            font-size: 32px;
        }
        &.is-h4 {
            font-size: 24px;
        }

        // Breakpoints
        @media #{$lt-phone} {
            &.is-h1 {
                font-size: 60px;
            }
            &.is-h2 {
                font-size: 32px;
            }
            &.is-h3 {
                font-size: 24px;
            }
            &.is-h4 {
                font-size: 18px;
            }
        }
    }
    .gutenberg-paragraph {
        line-height: 1.4;
    }
    .gutenberg-list {
        padding: 0 calc(var(--unit-gutter) * 2);
        line-height: 1.4;

        ::v-deep li {
            margin: 0.5ch 0;
        }
        &.is-ul {
            ::v-deep li {
                padding-left: 1ch;
                &::marker {
                    content: "—";
                }
            }
        }
    }
    .gutenberg-columns {
        ::v-deep {
            .gutenberg-column {
                padding: 0 var(--unit-margin-small);
                box-sizing: border-box;

                .gutenberg-block {
                    padding: 0;
                }
            }
        }

        @media #{$lt-phone} {
            ::v-deep {
                .gutenberg-column {
                    margin-bottom: var(--unit-margin-small);
                    padding: 0;

                    &:last-child {
                        margin-bottom: 0;
                    }
                    &.column-empty {
                        display: none;
                    }
                }
            }
        }
    }
    .gutenberg-gallery {
        --half-margin: calc(var(--unit-margin-small) / 2);
        padding: 0 var(--half-margin);

        &.mode-masonry {
            ::v-deep {
                .column {
                    box-sizing: border-box;
                    padding: 0 var(--half-margin);
                }
                .image {
                    margin: var(--unit-margin-small) 0;

                    &:first-child {
                        margin-top: 0;
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
        &.mode-cropped {
            ::v-deep {
                .image {
                    margin-bottom: var(--unit-margin-small);
                    padding: 0 var(--half-margin);
                    box-sizing: border-box;
                }
            }
        }

        // Breakpoints
        @media #{$lt-phone} {
            &.mode-masonry {
                ::v-deep {
                    .column {
                        padding: 0;
                    }
                }
            }
            &.mode-cropped {
                ::v-deep {
                    .image {
                        padding: 0;
                    }
                }
            }
        }
    }
    .gutenberg-quote {
        max-width: var(--unit-max-width-medium);
        text-align: center;

        ::v-deep {
            p {
                margin: var(--unit-margin-small) auto;
                font-size: 32px;
                line-height: 1.4;
            }
            .citation {
                font-size: 14px;
                margin-top: -1em;
                font-weight: 500;
            }
        }
    }
    .gutenberg-cover {
        max-width: 100%;
        padding: 0;
        height: 70vh;
        min-height: 400px;
    }
    .gutenberg-spacer {
        margin: 0 auto;
    }

    // This is mostly used for legacy blog posts
    .gutenberg-freeform {
        ::v-deep {
            img {
                width: 100vw;
                margin-left: 50%;
                transform: translateX(-50%);
                height: auto;
                display: block;
                margin: var(--unit-margin-small) auto var(--unit-margin-small)
                    50%;
                max-width: var(--unit-max-width-large);
                padding: 0 var(--unit-gutter);
                box-sizing: border-box;
                max-height: 80vh;
                object-fit: contain;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                max-width: var(--unit-max-width-medium);
                margin: var(--unit-margin-small) auto;
            }
            p {
                max-width: var(--unit-max-width-small);
                margin: var(--unit-margin-small) auto;
            }
            &:first-child {
                margin-top: 0;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
