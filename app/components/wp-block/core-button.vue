<template>
    <div
        v-if="parsedAttrs.text"
        class="core-button"
        :class="classes"
        :style="parsedStyles"
    >
        <nuxt-link
            :to="parsedAttrs.url"
            :target="parsedAttrs.target"
            class="link"
            :style="linkStyles"
        >
            {{ parsedAttrs.text }}
        </nuxt-link>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    attrs: {
        type: Object,
        default: () => ({})
    },
    innerBlocks: {
        type: Array,
        default: () => []
    }
})

// Computed
const classes = computed(() => [
    'core-button',
    'margin-text',
    props.attrs?.className || '',
    `is-width-${props.attrs?.width}`,
    `align-${props.attrs?.textAlign || 'default'}`,
    { 'is-link': props.attrs?.url }

])
const parsedStyles = computed(() => ({
    'font-size': parsedFontSize.value,
    '--color': props.attrs?.style?.color?.text || '',
    '--background-color': props.attrs?.style?.color?.background || ''
}))

const parsedAttrs = computed(() => {
    return {
        ...props.attrs,
        url: props.attrs?.url || '',
        target: props.attrs?.linkTarget || '_self',
        text: props.attrs?.text || ''
    }
})

const linkStyles = computed(() => ({
    'background-color': props.attrs?.style?.color?.background || '',
    'border-radius': props.attrs?.style?.border?.radius || ''
}))

const parsedFontSize = computed(() => {
    let output = props.attrs?.style?.typography?.fontSize || props.attrs?.fontSize

    // Add pixels if only given number
    const isNumber = /^\d+$/.test(output)
    if (isNumber) {
        output = `${output}px`
    }

    return output
})
</script>

<style scoped>
.core-button {
    box-sizing: border-box;
    display: inline-block;

    /* Widths */
    &.is-width-25 {
        width: calc(25% - 2em);
    }
    &.is-width-50 {
        width: calc(50% - 2em);
    }
    &.is-width-75 {
        width: calc(75% - 2em);
    }
    &.is-width-100 {
        width: calc(100% - 2em);
    }

    /* Alignment */
    &.align-left .link {
        text-align: left;
    }
    &.align-center .link {
        text-align: center;
    }
    &.align-right .link {
        text-align: right;
    }

    /* Inner link */
    .link {
        width: 100%;
        display: inline-block;
        text-align: center;
        word-break: break-word;
        box-sizing: border-box;

        color: var(--color, #fff);
        background-color: var(--background-color, #32373c);
        border-radius: 9999px;
        text-decoration: none;
        padding: calc(0.667em + 2px) calc(1.333em + 2px) calc(0.5em + 2px);

        transition:
            0.4s opacity ease-in-out,
            0.4s background-color ease-in-out,
            0.4s color ease-in-out,
            0.4s border-color ease-in-out;
    }
    &.is-style-outline .link {
        border: 2px solid;
        padding: 0.667em 1.333em 0.5em;
        color: var(--color, #32373c);
        border-color: var(--color, #32373c);

        background-color: transparent;
        background-image: none;
    }

    /* Hovers */
    @media (--has-hover) {
        &.is-link {
            .link:hover {
                opacity: 0.75;
            }
            &.is-style-outline .link:hover {
                opacity: 1;
                border-color: var(--background-color, #32373c);
            }
        }
    }
}
</style>
