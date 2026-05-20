<template>
    <component
        :is="tag"
        ref="textRef"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import type { SplitType } from '~/composables/useSplitText'

const props = withDefaults(defineProps<{
    tag?: string
    type?: SplitType
    linesClass?: string
    wordsClass?: string
    charsClass?: string
    mask?: boolean
    observeLines?: boolean
}>(), {
    tag: 'div',
    type: 'words',
    mask: false,
    observeLines: false
})

const textRef = useTemplateRef<HTMLElement>('textRef')

useSplitText(textRef, {
    type: props.type,
    linesClass: props.linesClass,
    wordsClass: props.wordsClass,
    charsClass: props.charsClass,
    mask: props.mask,
    observeLines: props.observeLines
})
</script>
