<template lang="html">
    <div class="shortcode shortcode-column column">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.shortcode-column {
    width: 50%;

    img {
        max-width: 100%;
        height: auto;
    }
}
</style>
