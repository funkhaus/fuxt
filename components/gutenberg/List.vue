<template lang="html">
    <component
        :is="listType"
        :class="classes"
        :style="styles"
    >
        <gutenberg-list-item
            v-for="(block, i) in innerBlocks"
            :key="`list-item-${i}`"
            v-html="block.content"
        />
    </component>
</template>

<script>
export default {
    props: {
        innerBlocks: {
            type: Array,
            default: () => []
        },
        ordered: {
            type: Boolean,
            default: false
        },
        textColor: {
            type: String,
            default: ""
        },
        backgroundColor: {
            type: String,
            default: ""
        },
        fontSize: {
            type: String,
            default: ""
        }
    },
    computed: {
        classes() {
            return ["gutenberg-list", "margin-text", `is-${this.listType}`]
        },
        styles() {
            return {
                color: this.textColor,
                "background-color": this.backgroundColor,
                "font-size": this.fontSize
            }
        },
        listType() {
            let output = "ul"
            if (this.ordered) {
                output = "ol"
            }
            return output
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-list {
}
</style>
