<template>
    <li :class="classes">
        <a
            v-if="!isRelative || isMailTo"
            :target="isTargetBlank"
            :href="item.url"
            class="menu-link link-external"
            @click="menuInteracted"
            v-html="item.label"
        />

        <nuxt-link
            v-if="isRelative && !isHash"
            :to="relativeUrl"
            class="menu-link link-internal"
            @click.native="menuInteracted"
            v-html="item.label"
        />

        <span
            v-if="isHash"
            class="menu-label"
            v-html="item.label"
        />

        <!-- TODO Make prop for sub-menus to be drop downs -->
        <ul
            v-if="hasSubMenu"
            class="sub-menu"
        >
            <wp-menu-item
                v-for="(subItem, i) in getChildren"
                :key="`sub-${i}`"
                class="menu-item sub-menu-item"
                :item="subItem"
                @menu-interacted="menuInteracted"
            />
        </ul>
    </li>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        classes() {
            return [
                "wp-menu-item menu-item",
                {
                    "is-realtive": this.isRelative
                },
                { "has-sub-menu": this.hasSubMenu },
                { "is-disabled": this.isHash },
                ...this.item.cssClasses
            ]
        },
        getChildren() {
            return this.item.childItems?.nodes || []
        },
        hasSubMenu() {
            return this.getChildren.length
        },
        isRelative() {
            return (
                this.item.target !== "_blank" &&
                !this.isMailTo &&
                this.relativeUrl.startsWith("/")
            )
        },
        isTargetBlank() {
            let target = "_blank"
            if (this.item.target !== "_blank") {
                target = "_self"
            }
            return target
        },
        isHash() {
            return this.item.label == "#"
        },
        isMailTo() {
            return this.item.url.includes("mailto:")
        },
        relativeUrl() {
            let url = this.item.url
            // Replace all these things
            const replaceThese = [
                this.$store.state.siteMeta.frontendUrl || "",
                this.$store.state.siteMeta.backendUrl || ""
            ]
            replaceThese.forEach((element) => {
                url = url.replace(element, "")
            })
            return url
        }
    },
    methods: {
        menuInteracted(event) {
            this.$emit("menu-interacted", event)
        }
    }
}
</script>
