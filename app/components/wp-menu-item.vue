<template>
    <li :class="classes">
        <nuxt-link
            :to="props.item.uri || props.item.url"
            :target="props.item.target"
        >
            {{ props.item?.title || '' }}
        </nuxt-link>

        <ul
            v-if="hasSubMenu"
            class="sub-menu"
        >
            <wp-menu-item
                v-for="child in children"
                :key="child.id"
                :item="child"
                class="sub-menu-item"
            />
        </ul>
    </li>
</template>

<script setup lang="ts">
const props = defineProps({
    item: {
        type: Object,
        default: () => {}
    }
})

// Computeds
const children = computed(() => props.item?.children || [])
const hasSubMenu = computed(() => Boolean(children.value.length || 0))
const classes = computed(() => ['wp-menu-item', 'menu-item', { 'has-sub-menu': hasSubMenu.value }, ...props.item.classes])
</script>
