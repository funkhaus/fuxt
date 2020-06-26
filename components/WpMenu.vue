<template>
    <ul :class="classes">
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
            default: ""
        }
    },
    data() {
        return {
            menuItems: []
        }
    },
    computed: {
        classes() {
            return ["wp-menu", `location-${_kebabCase(this.location)}`]
        }
    },
    async fetch() {
        // Make location name upper case with undersocres instead of spaces
        const locationName = _upperCase(this.location).replace(/ /g, "_")

        try {
            let response = await this.$apollo
                .query({
                    query: MENU_BY_LOCATION,
                    variables: {
                        location: locationName
                    }
                })
                .then(({ data }) => data)

            this.menuItems = _get(response, "menuItems.nodes", [])
        } catch (error) {
            console.log("Fetch error in <wp-menu>: ", error)
        }
    },
    methods: {
        menuInteracted(event) {
            this.$emit("menu-interacted", event)
        }
    }
}
</script>
