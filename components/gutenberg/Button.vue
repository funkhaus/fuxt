<template>
    <div
        v-if="text"
        class="gutenberg-button"
        :class="classes"
        :style="parsedStyles"
    >
        <wp-link
            :to="url"
            :target="target"
            class="link"
            :style="linkStyles"
            v-html="text"
        />
    </div>
</template>

<script>
export default {
    props: {
        fontSize: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        },
        styles: {
            type: Object,
            default: () => ({})
        },
        target: {
            type: String,
            default: ""
        },
        backgroundColor: {
            type: String,
            default: ""
        },
        textColor: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        widthPercentage: {
            type: Number,
            default: 0
        }
    },
    computed: {
        classes() {
            return [
                "gutenberg-button",
                "margin-text",
                `is-width-${this.widthPercentage}`
            ]
        },
        parsedStyles() {
            return {
                "font-size": this.parsedFontSize,
                "--color": this.textColor,
                "--background-color": this.backgroundColor
            }
        },
        linkStyles() {
            return {
                "background-color": this.backgroundColor,
                "border-radius": this.styles?.border?.radius || ""
            }
        },
        parsedFontSize() {
            let output = this.styles?.typography?.fontSize || this.fontSize

            // Add pixels if only given number
            const isNumber = /^\d+$/.test(output)
            if (isNumber) {
                output = `${output}px`
            }

            return output
        }
    }
}
</script>

<style lang="scss" scoped>
.gutenberg-button {
    box-sizing: border-box;
    display: inline-block;

    // Widths
    &.is-width-25 {
        width: calc(25% - 2em);
    }
    &.is-width-50 {
        width: calc(50% - 2em);
    }
    &.is-width-75 {
        width: calc(75% - 2em);
    }
    &.is-width-100 {
        width: calc(100% - 2em);
    }

    // Inner link
    .link {
        width: 100%;
        display: inline-block;
        text-align: center;
        word-break: break-word;
        box-sizing: border-box;

        color: var(--color, #fff);
        background-color: var(--background-color, #32373c);
        border-radius: 9999px;
        text-decoration: none;
        padding: calc(0.667em + 2px) calc(1.333em + 2px) calc(0.5em + 2px);

        transition: 0.4s opacity ease-in-out, 0.4s background-color ease-in-out,
            0.4s color ease-in-out;
    }
    &.is-style-outline .link {
        border: 2px solid;
        padding: 0.667em 1.333em 0.5em;
        color: var(--color, #32373c);
        border-color: var(--color, #32373c);

        background-color: transparent;
        background-image: none;
    }
    a.wp-link:hover {
        opacity: 0.8;
    }

    // Hovers
    @media #{$has-hover} {
        &.is-style-outline .link:hover {
            opacity: 1;
            background-color: var(--color, #32373c);
            border-color: var(--color, #32373c);
            color: #fff;
        }
    }
}
</style>
