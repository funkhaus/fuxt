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
import _get from "lodash/get"
import _kebabCase from "lodash/kebabCase"

// Remove the block prefix's WordPress gives them
function getBlockName(name = "") {
    name = name
        .replace("core/", "")
        .replace("acf/", "")
        .replace("genesis-custom-blocks/", "")
        .toLowerCase()
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
    },
    props: {
        blocks: {
            type: Array,
            default: () => [],
        },
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
                    id: _get(obj, "attributes.wpId", ""),
                    class: `gutenberg-block ${_get(
                        obj,
                        "attributes.wpClasses",
                        ""
                    )}`,
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

                // Shape any props as needed
                switch (output.componentName) {
                    case "gutenberg-image":
                        output.image = _get(output, "mediaItem.nodes[0]", {})
                        break

                    case "gutenberg-gallery":
                        output.images = _get(output, "mediaItems.nodes", [])

                        // Use the new gallery inner blocks for images
                        if (output.images) {
                            const imageBlocks = _get(output, "innerBlocks", [])
                            output.images = imageBlocks.map((obj) => {
                                return _get(obj, "mediaItem.nodes[0]", {})
                            })
                        }

                        break
                }

                // Remove un-needed elements from object and return
                delete output.attributes
                return output
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.wp-gutenberg {
    // Margins above/below main section blocks, text blocks, and between text and text.
    --unit-margin-large: 80px;
    --unit-margin-small: 40px;
    --unit-margin-xsmall: 15px;

    // Gaps on the side of a block (between browser edge)
    --unit-gutter: var(--unit-gap, 40px);

    // Max width of blocks: Section, headings/quotes, paragraph/lists.
    --unit-max-width-large: var(--unit-max-width, 1600px);
    --unit-max-width-medium: 1280px;
    --unit-max-width-small: 960px;

    margin: var(--unit-margin-large) auto;
    display: flow-root;

    // Genric styles for all top level blocks
    > .gutenberg-block {
        margin: var(--unit-margin-small) auto;
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

    // Margin type defined here.
    // There are two main block types, "margin-section" and "margin-text".
    .margin-section {
        margin: var(--unit-margin-small) auto;

        + .margin-text {
            margin-bottom: var(--unit-margin-xsmall);
        }
    }
    .margin-text {
        margin: var(--unit-margin-large) auto 0 auto;
        max-width: var(--unit-max-width-small);

        + .margin-text {
            margin: var(--unit-margin-xsmall) auto;
        }
        + .margin-section {
            margin-top: var(--unit-margin-large);
        }
        &:first-child {
            margin-bottom: var(--unit-margin-xsmall);
        }

        ::v-deep {
            a {
                text-decoration: underline;
                transition: opacity 400ms
                    var(--easing-authentic-motion, "ease-in-out");
            }
            a:hover {
                opacity: 0.35;
            }
        }
    }

    // Specific block styling below.
    .gutenberg-columns {
        ::v-deep {
            .gutenberg-column {
                padding: 0 var(--unit-margin-small);
                box-sizing: border-box;

                .gutenberg-block {
                    padding: 0;
                }
            }
            .gutenberg-heading,
            .gutenberg-paragraph,
            .gutenberg-list {
                max-width: 450px;
            }
        }

        + .gutenberg-columns {
            margin-top: var(--unit-margin-large);
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
            margin-bottom: calc(-1 * var(--unit-margin-small));

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
        font-size: 40px;

        ::v-deep {
            p {
                margin: var(--unit-margin-small) auto;
            }
            .citation {
                font-size: 50%;
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
    .gutenberg-heading {
        max-width: var(--unit-max-width-small);

        // Align
        &.align-center {
            max-width: var(--unit-max-width-medium);
        }

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
    }
    .gutenberg-paragraph {
        line-height: 1.4;

        + .gutenberg-paragraph {
            margin-top: var(--unit-margin-small);
        }
        + .gutenberg-heading {
            margin-top: var(--unit-margin-large);
        }
    }
    .gutenberg-list {
        padding: 0 calc(var(--unit-gutter) * 2);

        ::v-deep li {
            margin: 10px 0;
        }

        // Types
        &.is-ul {
            ::v-deep li {
                padding-left: 1ch;
                &::marker {
                    content: "—";
                }
            }
        }

        + .gutenberg-paragraph {
            margin-top: var(--unit-margin-small);
        }
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

                + {
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6,
                    p {
                        margin-top: var(--unit-margin-large);
                    }
                }
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                max-width: var(--unit-max-width-medium);
                margin: var(--unit-margin-small) auto;

                + img {
                    margin-top: var(--unit-margin-large);
                }
            }
            p {
                max-width: var(--unit-max-width-small);
                margin: var(--unit-margin-small) auto;

                + img {
                    margin-top: var(--unit-margin-large);

                    &:first-child {
                        margin-top: 0;
                    }
                    &:last-child {
                        margin-top: 0;
                    }
                }
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
