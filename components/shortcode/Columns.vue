<template lang="html">
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
// Components
import shortcodeColumn from "~/shortcode/Column"

export default {
    components: {
        shortcodeColumn
    },
    props: {
        columns: {
            type: [Number, String],
            default: 2
        }
    },
    computed: {
        classes() {
            return ["shortcode-columns", `columns-${this.columns}`]
        }
    }
}
</script>

<style lang="scss">
.shortcode-columns {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: flex-start;
    align-items: center;
    margin: 50px 0;

    .column {
        box-sizing: border-box;
    }

    &.columns-1 {
        .column {
            width: 100%;
        }
    }
    &.columns-2 {
        .column {
            width: 50%;
        }
    }
    &.columns-3 {
        .column {
            width: 33.33%;
        }
    }
    &.columns-4 {
        .column {
            width: 25%;
        }
    }
}
</style>
