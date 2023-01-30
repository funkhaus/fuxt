<template lang="html">
    <div
        :class="classes"
        :style="styles"
    >
        <wp-gutenberg
            class="wp-gutenberg"
            :blocks="blocks"
        />
    </div>
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
                "--flex-basis": this.width
            }
        },
        classes() {
            return [
                "gutenberg-column",
                "gutenberg-block",
                `vertical-alignment-${this.verticalAlignment || "default"}`,
                { "column-empty": this.blocks.length == 0 }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-column {
    flex-basis: var(--flex-basis, 0);
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: stretch;

    ::v-deep > * {
        width: 100%;
    }

    /* Vertical alignment opations */
    &.vertical-alignment-top {
        justify-content: flex-start;
    }
    &.vertical-alignment-center {
        justify-content: center;
    }
    &.vertical-alignment-bottom {
        justify-content: flex-end;
    }

    /* Make a column containing more columns collapse margin
    to be consistent with columns in regular content flow */
    .gutenberg-columns + .gutenberg-columns {
        margin-top: 0;
    }
    > .wp-gutenberg {
        margin: 0;
    }
}
</style>
