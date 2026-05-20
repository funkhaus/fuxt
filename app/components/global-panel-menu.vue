<template>
    <div :class="classes">
        <wp-menu
            name="Main Menu"
            class="menu-panel"
            @click="closeMenu"
        />

        <div
            class="menu-content"
            style="max-width: 400px"
        >
            This is the panel menu. It slides down from the top when opened.
        </div>
    </div>
</template>

<script setup lang="ts">
type GlobalPanelMenuProps = { isOpened: boolean }
const props = defineProps<GlobalPanelMenuProps>()

const emit = defineEmits(['close-menu'])

const classes = computed(() => [
    'global-panel-menu',
    { 'is-opened': props.isOpened }
])

const closeMenu = () => {
    emit('close-menu')
}
</script>

<style scoped>
.global-panel-menu {
    position: fixed;
    inset: 0;

    transition: transform 0.4s var(--easing-authentic-motion);
    transform: translateY(-100%);
    background-color: var(--color-white);

    /* When open, slide down from top */
    &.is-opened {
        transform: translateY(0);
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
