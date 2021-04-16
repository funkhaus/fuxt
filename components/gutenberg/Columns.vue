<template lang="html">
    <div class="gutenberg-columns">
        <gutenberg-column
            v-for="(column, i) in parsedBlocks"
            :key="i"
            :blocks="column.blocks"
            :vertical-alignment="column.verticalAlignment"
            :width="column.width"
            class="gutenberg-column"
        />
    </div>
</template>
<script>
import GutenbergColumn from "~/components/gutenberg/Column"

export default {
    components: {
        GutenbergColumn,
    },
    props: {
        blocks: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        parsedBlocks() {
            return this.blocks.map((obj) => {
                // Flatten the "attributes"
                return {
                    ...obj,
                    ...obj.attributes,
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-columns {
    display: flex;
    margin: 2em auto;
    width: 100%;

    .gutenberg-column {
        margin-right: 2em;

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
