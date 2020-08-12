<template lang="html">
    <a
        class="mock-nuxt-link"
        :href="`#${to}`"
    >
        <slot />
    </a>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: "",
        },
    },
}
</script>
