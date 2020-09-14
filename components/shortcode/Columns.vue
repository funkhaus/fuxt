<template lang="html">
    <div class="shortcode shortcode-columns column">
        <slot />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.shortcode-columns {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
}
</style>
