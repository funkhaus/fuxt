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
}>(), {
    tag: 'div',
    type: 'words'
})

const textRef = useTemplateRef<HTMLElement>('textRef')

useSplitText(textRef, {
    type: props.type,
    linesClass: props.linesClass,
    wordsClass: props.wordsClass,
    charsClass: props.charsClass
})
</script>
