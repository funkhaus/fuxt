<template>
    <nav :class="classes">
        <ul class="menu">
            <li
                v-for="item in items"
                :key="item.id"
                class="menu-item"
            >
                <!-- TODO: Hanlde link classes and ids, and child items -->

                <slot
                    :title="item.title"
                    :uri="item.uri || item.url"
                    :target="item.target"
                    :classes="item.classes"
                >
                    <nuxt-link
                        :to="item.uri"
                    >
                        {{ item.title }}
                    </nuxt-link>
                </slot>
            </li>
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

const { data } = await useWpFetch(`/menus`, {
    query: {
        name: props.name
    },
    onResponseError({ error }) {
        console.warn('<wp-menu> Fetch Error:', props.name, error)
        data.value = {}
    }
})

const classes = computed(() => ['wp-menu', `name-${_KebabCase(props.name) || 'unknown'}`])

const items = computed(() => {
    let output = data.value || []
    if (props.items.length) {
        output = props.items
    }
    return output
})
</script>
