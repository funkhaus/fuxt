<template>
    <nav :class="classes">
        <ul class="menu">
            <template
                v-for="item in items"
                :key="item.id || item.uri || item.url"
            >
                <slot
                    :title="item.title"
                    :to="item.uri || item.url"
                    :target="item.target"
                    :classes="item.classes"
                >
                    <wp-menu-item :item="item" />
                </slot>
            </template>
        </ul>
    </nav>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    items: {
        type: Array,
        default: () => []
    }
})

// Fetch data from WP
const { data } = await useWpFetch(`/menus`, {
    query: {
        name: props.name
    },
    onResponseError({ error }) {
        console.warn('<wp-menu> Fetch Error:', props.name, error)
        data.value = {}
    }
})

// Computeds
const classes = computed(() => ['wp-menu', `name-${_KebabCase(props.name) || 'unknown'}`])
const items = computed(() => data.value || props.items || [])
</script>
