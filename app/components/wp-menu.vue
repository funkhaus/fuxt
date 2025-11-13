<template>
    <nav :class="classes">
        <slot name="before" />
        <ul class="menu">
            <slot name="inner" />

            <template
                v-for="item in items"
                :key="item.id || item.uri || item.url"
            >
                <slot
                    :title="item.title"
                    :to="item.uri || item.url"
                    :item="item"
                    :target="item.target"
                    :classes="item.classes"
                >
                    <wp-menu-item
                        :item="item"
                        @click="menuInteracted"
                    />
                </slot>
            </template>
        </ul>
        <slot name="after" />
    </nav>
</template>

<script setup lang="ts">
// Types
import type { WpMenuProps, WpMenuResponse } from '~/types'

const emit = defineEmits(['menu-interacted'])

// Props
const props = defineProps<WpMenuProps>()

// Data
const data = ref<WpMenuResponse[]>([])

// Fetch data from WP
if (props.name) {
    const { data: fetchedData } = await useWpFetch(RequestType.MENUS, {
        query: {
            name: props.name
        },
        onResponseError({ error }: { error: Error }) {
            console.warn('<wp-menu> Fetch Error:', props.name, error)
            data.value = []
        }
    })

    data.value = fetchedData?.value || []
}
else {
    console.log('<wp-menu> No menu name provided')
}

// Computeds
const classes = computed(() => ['wp-menu', `name-${_KebabCase(props.name) || 'unknown'}`])
const items = computed(() => {
    let output = props?.items || []
    if (data.value?.length) {
        output = data.value
    }
    return output
})

// Methods
const menuInteracted = (event: MouseEvent) => {
    emit('menu-interacted', event)
}
</script>
