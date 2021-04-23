<template lang="html">
    <wp-gutenberg
        :blocks="blocks"
        :class="classes"
        :style="styles"
    />
</template>

<script>
export default {
    props: {
        blocks: {
            type: Array,
            default: () => []
        },
        verticalAlignment: {
            type: String,
            default: "default"
        },
        width: {
            type: String,
            default: ""
        }
    },
    computed: {
        styles() {
            return {
                "flex-basis": this.width
            }
        },
        classes() {
            return [
                "gutenberg-column",
                "gutenberg-block",
                `vertical-alignment-${this.verticalAlignment}`
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-column {
    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: stretch;

    /deep/ > * {
        width: 100%;
    }

    // Vertical alignment opations
    &.vertical-alignment-top {
        justify-content: flex-start;
    }
    &.vertical-alignment-center {
        justify-content: center;
    }
    &.vertical-alignment-bottom {
        justify-content: flex-end;
    }

    // Make a column containing more columns collapse margin
    // to be consistent with columns in regular content flow
    .gutenberg-columns + .gutenberg-columns {
        margin-top: 0;
    }
}
</style>
