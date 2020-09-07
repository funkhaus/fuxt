<template>
    <ul
        :key="location"
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
import _upperCase from "lodash/upperCase"
import _get from "lodash/get"

// GQL
import MENU_BY_LOCATION from "~/gql/queries/MenuByLocation"

export default {
    props: {
        location: {
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
            return
        }

        // WordPress expects menu locations to be SNAKE_CASE.
        // So if an uppercase location name is given, we use that
        // so a use can manually do `A24_MENU` which would otherwise
        // Be converted to `A_24_MENU` if set as  "a24 - Menu"
        let locationName = this.location
        if (locationName !== this.location.toUpperCase()) {
            locationName = _upperCase(this.location).replace(/ /g, "_")
        }

        try {
            const data = await this.$graphql.request(MENU_BY_LOCATION, {
                location: locationName,
            })
            this.menuItems = _get(data, "menuItems.nodes", [])
            this.hasLoaded = true
            this.$emit("loaded")
        } catch (error) {
            console.log("Fetch error in <wp-menu>: ", error)
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
                `location-${_kebabCase(this.location) || "unknown"}`,
                { "has-loaded": this.hasLoaded },
            ]
        },
    },
    methods: {
        menuInteracted(event) {
            this.$emit("menu-interacted", event)
        },
    },
}
</script>
