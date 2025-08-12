<template>
    <section class="page-home">
        Home page here
        <wp-image
            v-for="(item, index) in items"
            :key="index"
            :image="item"
        />

        <button @click="toggleMenu()" class="button">
            Toggle menu
        </button>

        <div
            v-html="data?.content"
        />
    </section>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

// Fetch data from WP
const pageReq = useWpFetch(`/post`, {
    query: {
        uri: '/'
    }
})
const workReq = useWpFetch(`/post`, {
    query: {
        uri: '/work',
        fields: 'acf, children'
    }
})

const [{ data: workData }, { data: pageData }] = await Promise.all([workReq, pageReq])

// Computed properties
const items = computed(() => {
    return workData?.value?.children?.map(item => item?.featuredMedia || {}) || []
})

// Methods
const toggleMenu = () => {
    siteStore.menuOpened = !siteStore.menuOpened
}
</script>

<style scoped>
/* TODO: figure out how to import mixins globally */
@import "~/assets/css/mixins.css";

.page-home {
    min-height: 200vh;

    color: var(--color-black);


    .button{
        @mixin text-underline var(--color-black);
    }

    /* margin: 0 auto; */
    /* min-height: var(--unit-100vh); */

    /* Hover states */
    /* @media #{$has-hover} {
         Hover styles would go here
    } */

    /* Hover */
    @media (--has-hover) {
    }
    /* Breakpoints */
    @media (--gt-cinema) {
    }
    @media (--lt-tablet) {
    }
    @media (--lt-phone) {
    }
}
</style>
