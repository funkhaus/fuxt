<template>
    <div class="wp-content">
        <component
            :is="allBlocks[block.blockName]"
            v-for="(block, index) in parsedBlocks"
            v-bind="block"
            :id="block.anchorId"
            :key="`wp-block-${index}`"
            :class="block.classes"
        />
    </div>
</template>

<script setup lang="ts">
// Load all components. I wish these were async somehow?
const allBlocks = {
    'core-paragraph': resolveComponent('wp-block-core-paragraph'),
    'core-heading': resolveComponent('wp-block-core-heading'),
    'core-image': resolveComponent('wp-block-core-image'),
    'core-columns': resolveComponent('wp-block-core-columns'),
    'core-column': resolveComponent('wp-block-core-column'),
    'core-cover': resolveComponent('wp-block-core-cover'),
    'core-list': resolveComponent('wp-block-core-list'),
    'core-spacer': resolveComponent('wp-block-core-spacer'),
    'core-gallery': resolveComponent('wp-block-core-gallery'),
    'core-quote': resolveComponent('wp-block-core-quote'),
    'core-embed': resolveComponent('wp-block-core-embed'),
    'core-video': resolveComponent('wp-block-core-video')
}

// Props
const props = defineProps({
    blocks: {
        type: Array,
        default: () => []
    }
})

// Parsed blocks
const parsedBlocks = computed(() => {
    // Remove blocks we don't have registered components for
    const blocks = props.blocks.filter((block) => {
        const blockName = block.blockName?.replace('/', '-') || ''
        return Boolean(allBlocks[blockName] || false)
    })

    // Reshape blocks with generic attributes
    return blocks.map((block) => {
        const blockName = block.blockName?.replace('/', '-') || ''

        return {
            ...block,
            blockName,
            anchorId: block.attrs.anchorId || '',
            classes: [
                'wp-block',
                blockName,
                block.attrs?.className || ''
            ]
        }
    })
})
</script>

<style scoped>
.wp-content {
    /* Margins above/below blocks */
    --unit-margin-large: 40px; /* Columns, Gallerys, Blockquotes... */
    --unit-margin-small: 20px; /* Everything except P, H{n} and lists. */

    /* Gaps on the side of a block (between browser edge) */
    --unit-gutter: var(--unit-gap, 40px);

    /* Gaps inbetween images in gallery */
    --unit-gallery-gap: var(--unit-gap, 40px);

    /* Max width of blocks */
    --unit-max-width-large: 1400px; /* Default, galleries, images, columns */
    --unit-max-width-medium: 1080px; /* Headings (center aligned), Blockquotes */
    --unit-max-width-small: 800px; /* Headings (left or right aligned), P, lists */

    margin: var(--unit-margin-large) auto;
    display: flow-root;

    /* Genric styles for all top level blocks */
    :where(> .wp-block) {
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

    /* Generic margins and max-widths */
    :where(.margin-text) {
        margin: var(--unit-margin-small) auto;
        max-width: var(--unit-max-width-small);
    }
    :where(.margin-section) {
        margin: var(--unit-margin-large) auto;
        max-width: var(--unit-max-width-large);
    }

    /* Specific block styling below. */
    .core-heading {
        line-height: 1.2;

        &.align-center {
            max-width: var(--unit-max-width-medium);
        }

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

        @media (--lt-phone) {
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
    .core-paragraph {
        line-height: 1.4;
    }
    .core-list {
        padding: 0 calc(var(--unit-gutter) * 2);
        line-height: 1.4;

        li {
            margin: 0.5ch 0;
        }
        &.is-ul {
            li {
                padding-left: 1ch;
                &::marker {
                    content: '—';
                }
            }
        }
    }
    .core-columns + .core-columns {
        margin-top: calc(var(--unit-margin-large) * -1);
    }
    :deep(.core-column) {
        padding: 0 var(--unit-margin-small);
        box-sizing: border-box;

        .wp-block {
            padding: 0;
        }

        @media (--lt-phone) {
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
    .core-gallery + .core-gallery {
        margin-top: calc((var(--unit-margin-large) * -1) + var(--unit-gallery-gap));
    }
    .core-quote {
        max-width: var(--unit-max-width-medium);
        text-align: center;

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
    .core-cover {
        max-width: 100%;
        padding: 0;
        height: 70vh;
        min-height: 400px;
    }
    .core-spacer {
        margin: 0 auto;
    }
}
</style>
