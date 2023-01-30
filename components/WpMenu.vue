<template>
    <ul
        v-if="menuItems.length"
        :key="name"
        :class="classes"
    >
        <slot name="before" />

        <wp-menu-item
            v-for="(item, i) in menuItems"
            :key="i"
            class="menu-item"
            :item="item"
            @menu-interacted="menuInteracted"
        />

        <slot name="after" />
    </ul>
</template>

<script>
// Helpers
import _kebabCase from "lodash/kebabCase"

// GQL
import MENU_BY_NAME from "~/gql/queries/MenuByName"

export default {
    props: {
        name: {
            type: String,
            default: ""
        },
        items: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            menuItems: this.items,
            hasLoaded: false
        }
    },
    async fetch() {
        // Don't fetch if WordPress menu items provided, use them.
        if (this.items.length) {
            this.menuItems = this.items
            return this.menuItems
        }

        try {
            const data = await this.$graphql.default.request(MENU_BY_NAME, {
                name: this.name
            })
            this.menuItems = data.menu?.menuItems?.nodes || []
            this.hasLoaded = true
            this.$emit("loaded")
        } catch (error) {
            console.error("Fetch error in <wp-menu>: ", error)
        }
    },
    computed: {
        classes() {
            return [
                "wp-menu",
                `name-${_kebabCase(this.name) || "unknown"}`,
                { "has-loaded": this.hasLoaded }
            ]
        }
    },
    watch: {
        name() {
            this.$fetch()
        }
    },
    fetchKey(getCounter) {
        return `${this.name}-${getCounter(this.name)}`
    },
    methods: {
        menuInteracted(event) {
            this.$emit("menu-interacted", event)
        }
    }
}
</script>
