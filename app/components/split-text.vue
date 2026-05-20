<template>
    <component
        :is="tag"
        ref="textRef"
        class="split-text"
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
    threshold?: number
    once?: boolean
}>(), {
    tag: 'div',
    type: 'words',
    mask: false,
    observeLines: false,
    threshold: 0.1,
    once: true
})

const textRef = useTemplateRef<HTMLElement>('textRef')

const { hasEntered } = useSplitText(textRef, {
    type: props.type,
    linesClass: props.linesClass,
    wordsClass: props.wordsClass,
    charsClass: props.charsClass,
    mask: props.mask,
    observeLines: props.observeLines,
    threshold: props.threshold,
    once: props.once
})

const splitOpacity = computed(() =>
    props.observeLines && props.linesClass && !hasEntered.value ? 0 : 1
)
</script>

<style scoped>
.split-text {
    opacity: v-bind(splitOpacity);
}
</style>
