<template>
    <nuxt-link
        v-if="isRelative || isInternal"
        class="wp-link"
        :to="parsedTo"
    >
        <slot />
    </nuxt-link>

    <a
        v-else-if="to"
        :href="parsedTo"
        :target="parsedTarget"
        class="wp-link"
    >
        <slot />
    </a>

    <component
        :is="element"
        v-else
        class="wp-link"
    >
        <slot />
    </component>
</template>
<!-- NOTES: - The linter didn't work, not sure how to configure it to work
            - Ran into issues when I got to the part of using stuff from the store  -->
<script setup lang="ts">
import { defineProps, computed, toRefs,  } from "vue"
const siteSetting = useSiteSettingStore()

const props = defineProps<{
    to: string
    target: string
    element: string

}>()

const { to, target, element } = toRefs(props)

let isRelative = computed(() => {
    let result = false
    switch (true) {
        case isEmail.value:
            result = false
            break
        case isPhone.value:
            result = false
            break
        case target.value == "_blank":
            // If open in new window, then render an a-tag
            result = false
            break
        case to && String(to).indexOf(".") === 0:
        case to && String(to).indexOf("/") === 0:
            // return true if we start with a slash
            result = true
    }
    return result
})

let frontendUrl = computed(() => {
    return siteSetting.settings.frontendUrl || false
})

let isInternal = computed(() => {
    // wp-content in url means probably a download link, so open in new window
    if (
        !to ||
        to.value?.includes("wp-content") ||
        isEmail.value ||
        isPhone.value
    ) {
        return false
    }
    return to.value.startsWith(frontendUrl.value)
})

let isHashLink = computed(() => {
    return to.value.startsWith("#")
})

let isEmail = computed(() => {
    return to.value.includes("mailto:")
})

let isPhone = computed(() => {
    return to.value.includes("tel:")
})


let parsedTo = computed(() => {
    // Should be the same as the deprecated unescape 
    let url = encodeURI(to.value)

    // Replace all these things
    const replaceThese = [
        siteSetting.siteMeta?.frontendUrl || "",
        siteSetting.siteMeta?.backendUrl || ""
    ]
    replaceThese.forEach((element) => {
        url = url.replace(element, "")
    })

    // Abort for non-local links
    switch (true) {
        case isEmail.value:
        case isPhone.value:
        case url.startsWith("/"):
        case url.startsWith("."):
        case url.startsWith("http"):
            return url
    }

    return `/${url}`
})

let parsedTarget = computed(() => {
    if (!isInternal.value && !isRelative.value && !isHashLink.value) {
        return "_blank"
    } else {
        return target
    }
})
</script>
