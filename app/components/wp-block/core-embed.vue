<template lang="html">
    <div :class="classes">
        <iframe
            class="iframe"
            :src="iFrameSrc"
            frameborder="0"
            allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture;"
            playsinline
            :height="dimensions.height"
            :width="dimensions.width"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    attrs: {
        type: Object,
        default: () => ({})
    }
})

// Computeds
const classes = computed(() => [
    'core-embed',
    'margin-section',
    `align-${props.attrs?.align || 'default'}`,
    { 'is-vimeo': isVimeo },
    { 'is-youtube': isYouTube }
])
const dimensions = computed(() => {
    const output = {
        height: 720,
        width: 1280
    }

    // Go through each class, and figure out the ratio from this: "wp-embed-aspect-16-9"
    props.attrs?.className?.split(' ').forEach((str) => {
        if (str.includes('wp-embed-aspect-')) {
            let ratio = str.replace('wp-embed-aspect-', '')
            ratio = ratio?.split('-')

            output.width = parseInt(ratio[0])
            output.height = parseInt(ratio[1])
        }
    })

    return output
})
const styles = computed(() => ({
    aspectRatio: dimensions.value.width / dimensions.value.height
}))
const isVimeo = computed(() => {
    return props.attrs.providerNameSlug == 'vimeo' || String(props.attrs.url).includes('vimeo.com')
})
const isYouTube = computed(() => {
    return props.attrs.providerNameSlug == 'youtube' || String(props.attrs.url).includes('youtube.com') || String(props.attrs.url).includes('youtu.be')
})
const iFrameSrc = computed(() => {
    let url = props.attrs?.url || ''

    switch (true) {
        case isYouTube.value:
        case isVimeo.value:
            url = buildVideoEmbedUrl(url, {
                autoplay: 0
            })
            break
    }

    return url
})
</script>

<style scoped>
.core-embed {
    position: relative;
    z-index: 0;

    .iframe {
        aspect-ratio: v-bind('styles.aspectRatio');
        height: 100%;
        width: 100%;
    }
}
</style>
