<template>
    <div
        :class="classes"
        :style="parsedStyles"
    >
        <wp-block-core-button
            v-for="(block, i) in parsedBlocks"
            :key="`block-button-${i}`"
            v-bind="block"
        />
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

const classes = computed(() => [
    'core-buttons',
    'margin-text',
    { 'is-vertical': props.attrs?.orientation == 'vertical' }
])
const parsedStyles = computed(() => ({
    'justify-content': props.attrs?.justifyContent || 'left',
    'flex-wrap': props.attrs?.flexWrap || 'wrap'
}))

const parsedFontSize = computed(() => {
    let output = props.attrs?.fontSize

    // Add pixels if only given number
    const isNumber = /^\d+$/.test(output)
    if (isNumber) {
        output = `${output}px`
    }

    return output
})

const parsedBlocks = computed(() => {
    return props.innerBlocks.map((obj) => {
        return {
            ...obj,
            fontSize: obj.fontSize || parsedFontSize.value
        }
    })
})
</script>

<style scoped>
.core-buttons {
    display: flex;
    align-items: center;
    gap: 0.5em;

    &.is-vertical {
        flex-direction: column;
    }
}
</style>
