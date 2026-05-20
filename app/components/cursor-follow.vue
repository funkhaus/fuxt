<template>
    <Teleport to="body">
        <div
            ref="cursorRef"
            :class="classes"
        >
            <!-- Preloaded images - all in DOM, only active one visible -->
            <img
                v-for="url in preloadedImages"
                :key="url"
                :src="url"
                :class="getImageClasses(url)"
                alt=""
            >
            <span
                v-if="!cursorState.image"
                class="text"
            >
                {{ cursorState.text }}
            </span>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import gsap from 'gsap'

// Composables
const { cursorState, show, hide } = useCursorFollow()

// Refs
const cursorRef = useTemplateRef<HTMLElement>('cursorRef')

// Preload a single image and add to cache
const preloadedImages = ref<string[]>([])
const failedImages = new Set<string>()

// GSAP quickTo functions for smooth animation
let setX: ReturnType<typeof gsap.quickTo> | null = null
let setY: ReturnType<typeof gsap.quickTo> | null = null

// We use this to save performance by not triggering the cursor follow effect if the same element is triggered again
let lastTrigger: HTMLElement | null = null
let lastText = ''
let lastImage = ''
let lastActive = false

// Store last cursor position for scroll detection
let lastCursorX = 0
let lastCursorY = 0

let rafId: number | null = null

// Computeds
const classes = computed(() => [
    'cursor-follow',
    { 'is-active': cursorState.isActive },
    { 'has-image': !!cursorState.image }
])

// Methods
const getImageClasses = (url: string) => {
    return [
        'image',
        { 'is-visible': url === cursorState.image }
    ]
}

// Throttle updates to once per frame
const requestHoverUpdate = () => {
    if (rafId != null) return
    rafId = requestAnimationFrame(() => {
        rafId = null
        checkTriggerAtPosition(lastCursorX, lastCursorY)
    })
}

const preloadImage = (url: string): Promise<void> => {
    if (!url || preloadedImages.value.includes(url) || failedImages.has(url)) return Promise.resolve()

    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
            preloadedImages.value.push(url)
            resolve()
        }
        img.onerror = () => {
            failedImages.add(url)
            // Hide cursor if it's currently showing this broken image
            if (cursorState.image === url) {
                lastTrigger = null
                lastActive = false
                lastImage = ''
                hide()
            }
            resolve()
        }
        img.src = url
    })
}

// Scan DOM for all cursor images and preload them
const preloadAllCursorImages = () => {
    const elements = document.querySelectorAll('[data-cursor-image]')
    const urls = new Set<string>()

    elements.forEach((el) => {
        const url = (el as HTMLElement).dataset.cursorImage
        if (url) urls.add(url)
    })

    // Preload all images in parallel
    urls.forEach(url => preloadImage(url))
}

// Find cursor trigger element from event target
const findCursorTrigger = (target: EventTarget | null): HTMLElement | null => {
    if (!target || !(target instanceof HTMLElement)) return null
    // Check for either text or image cursor triggers
    return target.closest('[data-cursor-text], [data-cursor-image]') as HTMLElement | null
}

// Core logic to check what's under cursor and update state
const checkTriggerAtPosition = (x: number, y: number) => {
    const elementAtPoint = document.elementFromPoint(x, y)
    const trigger = findCursorTrigger(elementAtPoint)

    if (trigger === lastTrigger) return
    lastTrigger = trigger

    if (trigger) {
        const text = trigger.dataset.cursorText || ''
        const image = trigger.dataset.cursorImage || ''

        // Don't activate if there's no content to show
        if (!text && (!image || failedImages.has(image))) {
            if (lastActive) {
                lastActive = false
                lastText = ''
                lastImage = ''
                hide()
            }
            return
        }

        // Only update if changed
        if (!lastActive || text !== lastText || image !== lastImage) {
            lastActive = true
            lastText = text
            lastImage = image
            show(text, image)
        }
    }
    else {
        if (lastActive) {
            lastActive = false
            lastText = ''
            lastImage = ''
            hide()
        }
    }
}

const onPointerMove = (e: MouseEvent) => {
    if (!setX || !setY) return
    setX(e.clientX)
    setY(e.clientY)

    // Store position for scroll detection
    lastCursorX = e.clientX
    lastCursorY = e.clientY

    requestHoverUpdate()
}

// Re-check on scroll (cursor stationary but elements moved)
const onScroll = () => {
    if (lastCursorX === 0 && lastCursorY === 0) return
    requestHoverUpdate()
}

const onMouseLeaveWindow = () => {
    lastTrigger = null
    lastActive = false
    lastText = ''
    lastImage = ''
    hide()
}

// Watch for active state and animate scale with GSAP
watch(() => cursorState.isActive, (active) => {
    if (!cursorRef.value) return

    gsap.to(cursorRef.value, {
        scale: active ? 1 : 0,
        duration: 0.4,
        ease: 'power3.out'
    })

    document.body.style.cursor = active ? 'none' : ''
})

// MutationObserver to detect new cursor images in DOM
let observer: MutationObserver | null = null

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Lifecycle
onMounted(() => {
    if (!canHover()) return

    if (!cursorRef.value) return

    // Initialize GSAP quickTo for smooth cursor movement
    setX = gsap.quickTo(cursorRef.value, 'x', {
        duration: 0.4,
        ease: 'power3.out'
    })
    setY = gsap.quickTo(cursorRef.value, 'y', {
        duration: 0.4,
        ease: 'power3.out'
    })

    // Set initial state
    gsap.set(cursorRef.value, {
        xPercent: -50,
        yPercent: -50,
        scale: 0
    })

    // Always listen to pointer movement and scroll
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Preload all cursor images after a short delay (allow DOM to populate)
    setTimeout(preloadAllCursorImages, 100)

    // Watch for DOM changes to preload new cursor images
    observer = new MutationObserver(() => {
        preloadAllCursorImages()
    })
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-cursor-image']
    })
})

onUnmounted(() => {
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('mouseleave', onMouseLeaveWindow)
    window.removeEventListener('scroll', onScroll)
    observer?.disconnect()
    if (rafId != null) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.cursor-follow {
    z-index: 600;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 8px 16px;
    box-sizing: border-box;

    max-width: max-content;
    background-color: var(--color-black);
    clip-path: polygon(10% 0, 90% 0, 100% 30%, 100% 70%, 90% 100%, 10% 100%, 0 70%, 0 30%);

    pointer-events: none;
    opacity: 0;

    transition: opacity 0.4s ease;
    will-change: opacity, transform;

    .text {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.3;
        text-transform: uppercase;
        color: var(--color-white);
    }

    .image {
        position: absolute;
        top: 0;
        left: 0;

        width: 350px;
        height: 250px;
        object-fit: cover;
        opacity: 0;
        pointer-events: none;

        &.is-visible {
            opacity: 1;
        }
    }

    &.is-active {
        opacity: 1;
    }

    /* Image mode - remove text styling */
    &.has-image {
        padding: 0;
        width: 350px;
        height: 250px;
        background-color: transparent;
        clip-path: none;
    }

    /* Hide on touch devices */
    @media (hover: none) {
        display: none;
    }
}
</style>
