<template>
    <figure :class="classes">
        Image here
        <img
            ref="mediaImage"
            :src="parsedSrc"
            loading="lazy"
            @load="setImageLoaded"
        >
    </figure>
</template>

<script setup lang="ts">
const mediaImage = ref(null)
const imageLoaded = ref(false)

// Props
const props = defineProps({
    image: {
        type: Object,
        default: () => ({})
    }

})

// Computeds
const classes = computed(() => ['wp-image', { 'has-loaded': imageLoaded.value }])
const parsedSrc = computed(() => props.image?.src || '')

// Actions
const setImageLoaded = () => {
    imageLoaded.value = true
}

// Lifecycle hooks
onMounted(() => {
    imageLoaded.value = mediaImage.value?.complete
})
</script>

<style scoped>
.wp-image {

    img {
        max-width: 100%;
        height: auto;
    }

}
</style>
