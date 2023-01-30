<template lang="html">
    <div class="gutenberg-columns margin-section">
        <gutenberg-column
            v-for="(column, i) in parsedBlocks"
            :key="i"
            :blocks="column.blocks"
            :vertical-alignment="column.verticalAlignment"
            :width="column.width"
            class="gutenberg-column gutenberg-block"
        />
    </div>
</template>
<script>
export default {
    props: {
        blocks: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        parsedBlocks() {
            return this.blocks.map((obj) => {
                // Flatten the "attributes"
                return {
                    ...obj,
                    ...obj.attributes
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-columns {
    display: flex;
    width: 100%;

    .gutenberg-column {
        &:first-child {
            padding-left: 0;
        }
        &:last-child {
            padding-right: 0;
        }
    }

    /* Breakpoints */
    @media #{$lt-phone} {
        display: block;

        .gutenberg-column {
            flex-basis: 1;
            padding: 0;
        }
    }
}
</style>
