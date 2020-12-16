<template>
    <ul
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
import _get from "lodash/get"

// GQL
import MENU_BY_NAME from "~/gql/queries/MenuByName"

export default {
    props: {
        name: {
            type: String,
            default: "",
        },
        items: {
            type: Array,
            default: () => [],
        },
    },
    async fetch() {
        // Don't fetch if WordPress menu items provided, use them.
        if (this.items.length) {
            this.menuItems = this.items
            return this.menuItems
        }

        try {
            const data = await this.$graphql.request(MENU_BY_NAME, {
                name: this.name,
            })
            this.menuItems = _get(data, "menu.menuItems.nodes", [])
            this.hasLoaded = true
            this.$emit("loaded")
        } catch (error) {
            console.error("Fetch error in <wp-menu>: ", error)
        }
    },
    data() {
        return {
            menuItems: this.items,
            hasLoaded: false,
        }
    },
    computed: {
        classes() {
            return [
                "wp-menu",
                `name-${_kebabCase(this.name) || "unknown"}`,
                { "has-loaded": this.hasLoaded },
            ]
        },
    },
    activated() {
        // This is a cache of fetch. Will call fetch again if last fetch more than 60 sec ago.
        if (this.$fetchState.timestamp <= Date.now() - 60000) {
            this.$fetch()
        }
    },
    methods: {
        menuInteracted(event) {
            this.$emit("menu-interacted", event)
        },
    },
}
</script>
