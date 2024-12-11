<template lang="html">
    <li
        class="core-list-item"
        v-html="innerHtml"
    />
</template>

<script setup lang="ts">
const props = defineProps({
    innerHtml: {
        type: String,
        default: ''
    },
    attrs: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style scoped>
.core-list-item {
}
</style>
