<template>
    <component :is="element">
        <span
            v-for="(line, i) in lines"
            :key="i"
            :class="['line', `line-${i + 1}`]"
            v-html="line"
        />
    </component>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: "",
        },
        separator: {
            type: [RegExp, String],
            default: () => {
                return / &#8211; | – /
            },
        },
        element: {
            type: String,
            default: "span",
        },
        keepSeparator: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        lines() {
            let output = this.text.split(this.separator)

            // Add separator back into array
            // This is useful if separating by an opening quote
            if (this.keepSeparator) {
                output = output.map((element, index) => {
                    if (index > 0) {
                        return ` ${this.separator} ` + element
                    }
                    return element
                })
            }

            return output
        },
    },
}
</script>
