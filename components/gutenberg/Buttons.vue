<template>
    <div
        :class="classes"
        :style="parsedStyles"
    >
        <gutenberg-button
            v-for="(block, i) in parsedInnerBlocks"
            :key="`block-button-${i}`"
            v-bind="block"
        />
    </div>
</template>

<script>
export default {
    props: {
        layout: {
            type: Object,
            default: () => ({})
        },
        fontSize: {
            type: String,
            default: ""
        },
        innerBlocks: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-buttons",
                "margin-text",
                { "is-vertical": this.layout?.orientation == "vertical" }
            ]
        },
        parsedStyles() {
            return {
                "justify-content": this.layout?.justifyContent || "left",
                "flex-wrap": this.layout?.flexWrap || "wrap"
            }
        },
        parsedFontSize() {
            let output = this.fontSize

            // Add pixels if only given number
            const isNumber = /^\d+$/.test(this.fontSize)
            if (isNumber) {
                output = `${this.fontSize}px`
            }

            return output
        },
        parsedInnerBlocks() {
            return this.innerBlocks.map((obj) => {
                return {
                    ...obj,
                    fontSize: obj.fontSize || this.parsedFontSize
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-buttons {
    display: flex;
    align-items: center; // Currently WP GQL Gutenberg doesn't expose this as a prop
    gap: 0.5em;

    &.is-vertical {
        flex-direction: column;
    }
}
</style>
