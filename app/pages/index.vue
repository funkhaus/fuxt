<template>
    <section class="page-home">
        <wp-menu
            name="Main Menu"
        />

        <global-hamburger
            :menu-opened="siteStore.menuOpened"
            @toggle-menu="toggleMenu()"
        />

        <div
            data-cursor-text="Custom Text"
            class="block-red"
        >
            Block Example
        </div>

        <!-- 1. Words — fade up on scroll -->
        <split-text
            v-intersection-observer.once="{ threshold: 0.2 }"
            tag="h1"
            type="words"
            words-class="word"
            class="demo-words"
        >
            Every word is its own element
        </split-text>

        <!-- 2. Chars — scale in one by one -->
        <split-text
            v-intersection-observer.once="{ threshold: 0.2 }"
            tag="h2"
            type="chars"
            chars-class="char"
            class="demo-chars"
        >
            Letters
        </split-text>

        <!-- 3. Lines — clip reveal from bottom -->
        <split-text
            v-intersection-observer.once="{ threshold: 0.2 }"
            tag="p"
            type="lines"
            lines-class="line"
            class="demo-lines"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </split-text>

        <!-- 4. Words + lines — stagger delay per word index -->
        <split-text
            v-intersection-observer.once="{ threshold: 0.2 }"
            tag="h2"
            type="words,lines"
            words-class="word"
            lines-class="line"
            class="demo-words-lines"
        >
            Each word and each line is wrapped separately
        </split-text>

        <wp-image
            v-for="(item, index) in items"
            :key="index"
            :image="item"
        />
    </section>
</template>

<script setup lang="ts">
// Helpers
const siteStore = useSiteStore()
const route = useRoute()

// Fetch data from WP
const { data: workData } = await useWpFetch(RequestType.POST, {
    query: {
        uri: route.path,
        fields: 'acf, children'
    }
})

// Publish SEO data for wp-seo (no separate request needed)
usePageSeo().value = {
    title: workData.value?.title,
    description: workData.value?.excerpt,
    imageUrl: workData.value?.featuredMedia?.src
}

// Computed properties
const items = computed(() => {
    return workData?.value?.children?.map(item => item?.featuredMedia) || []
})

// Methods
const toggleMenu = () => {
    siteStore.menuOpened = !siteStore.menuOpened
}
</script>

<style scoped>
.page-home {
    .demo-words {
        max-width: 300px;
        :deep(.word) {
            display: inline-block;
            opacity: 0;
            transform: translateY(30px);
            transition:
                opacity 0.6s ease,
                transform 0.6s ease;
            transition-delay: calc(var(--word) * 0.07s);
        }

        &.has-entered :deep(.word) {
            opacity: 1;
            transform: none;
        }
    }

    .demo-chars {
        max-width: 300px;
        :deep(.char) {
            display: inline-block;
            opacity: 0;
            transform: scale(0.4);
            transition:
                opacity 0.4s ease,
                transform 0.4s ease;
            transition-delay: calc(var(--char) * 0.04s);
        }

        &.has-entered :deep(.char) {
            opacity: 1;
            transform: none;
        }
    }

    .demo-lines {
        max-width: 300px;
        :deep(.line) {
            display: block;
            clip-path: inset(0 0 100% 0);
            transition: clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1);
            transition-delay: calc(var(--line) * 0.12s);
        }

        &.has-entered :deep(.line) {
            clip-path: inset(0 0 0% 0);
        }
    }

    .demo-words-lines {
        max-width: 300px;
        :deep(.word) {
            display: inline-block;
            opacity: 0;
            transform: translateX(-20px);
            transition:
                opacity 0.5s ease,
                transform 0.5s ease;
            transition-delay: calc(var(--word) * 0.05s);
        }

        &.has-entered :deep(.word) {
            opacity: 1;
            transform: none;
        }
    }

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
