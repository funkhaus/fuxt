<template lang="html">
    <div
        v-for="x in 10"
        v-if="1"
        class="core-spacer"
        :class="'foo'"
    />
</template>

<script setup lang="ts">
const props = defineProps({
    attrs: {
        type: Object,
        default: () => ({})
    }
})

const styles = computed(() => ({
    height: props.attrs?.height || '0px'
}))
</script>

<style scoped>
.core-spacer {
    padding: 0 0 v-bind('styles.height') 0;
}
</style>
