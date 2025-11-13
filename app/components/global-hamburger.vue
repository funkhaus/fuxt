<template>
    <div
        :class="classes"
        @click="onClick"
    >
        <div class="line one" />
        <div class="line two" />
    </div>
</template>

<script setup lang="ts">
// Types
type GlobalHamburgerProps = {
    menuOpened: boolean
}

// Props
const props = defineProps<GlobalHamburgerProps>()

// Emits
const emit = defineEmits(['toggle-menu'])

// Computed
const classes = computed(() => {
    return [
        'global-hamburger',
        { 'is-opened': props.menuOpened }
    ]
})

// Methods
const onClick = () => {
    emit('toggle-menu')
}
</script>

<style scoped>
.global-hamburger {
    position: fixed;
    right: 0;
    top: 0;

    padding: 30px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 7px;

    width: 22px;
    height: 20px;

    cursor: pointer;

    .line {
        display: block;

        width: 100%;
        height: 2px;

        background-color: var(--color-black);

        transition:
            translate 0.5s var(--easing-authentic-motion),
            rotate 0.5s var(--easing-authentic-motion),
            width 0.5s var(--easing-authentic-motion),
            height 0.5s var(--easing-authentic-motion);
    }

    /* Opened */
    &.is-opened {
        .line {
            &.one {
                rotate: 45deg;
                translate: 0 4px;
            }
            &.two {
                rotate: -45deg;
                translate: 0 -5px;
            }
        }
    }

    /* Hover */
    @media (--has-hover) {
        &:hover {
            .line.one {
                translate: 0 2px;
            }
            .line.two {
                translate: 0 -1px;
            }
        }
        &.is-opened {
            &:hover {
                .line.one {
                    translate: 0 4px;
                    width: 120%;
                }
                .line.two {
                    translate: 0 -5px;
                    width: 120%;
                }
            }
        }
    }
}
</style>
