<template>
    <div
        class="slideshow"
        tabindex="0"
        @keyup.right="goToNext(true)"
        @keyup.left="goToPrev(true)"
        @swipe-right="goToPrev(true)"
        @swipe-left="goToNext(true)"
    >
        <slot name="before" />

        <transition
            v-for="(slide, i) in slides"
            :key="slide.id"
            :name="transitionName"
            :mode="transitionMode"
        >
            <div
                v-show="activeSlideLogic(i, internalIdx)"
                class="slide"
            >
                <slot
                    :slide="slide"
                    name="slide"
                />
            </div>
        </transition>

        <button
            v-if="$slots['nav-next']"
            class="nav next"
            @click="goToNext(true)"
        >
            <slot name="nav-next" />
        </button>
        <button
            v-if="$slots['nav-prev']"
            class="nav prev"
            @click="goToPrev(true)"
        >
            <slot name="nav-prev" />
        </button>

        <slot
            name="after"
            :index="internalIdx"
        />
    </div>
</template>

<script>
// TODO: emit events, slide-change payload is new index

// import Vue from "vue"
import _clamp from "lodash/clamp"

// When used in a project update path for import
import initSwipeEvents from "~/utils/initSwipeEvents"

export default {
    props: {
        slides: {
            type: Array,
            required: true
        },
        // Determines if slideshow autoprogresses or not
        paused: {
            type: Boolean,
            default: false
        },
        // Sets the time before slideshow autoprogresses
        timeout: {
            type: Number,
            default: 4000
        },
        // Sets Vue transition on incomming/outgoing slides. If not set slide-right/left is used
        nextTransitionName: {
            type: String,
            default: "slide-left"
        },
        prevTransitionName: {
            type: String,
            default: "slide-right"
        },
        transitionMode: {
            type: String,
            default: ""
        },
        // Determines if slideshow should loop from last to first slide and vice-versa
        wrap: {
            type: Boolean,
            default: true
        },
        // Determines active slide by array index
        // Use .sync on prop to sync changes in variable with parent component
        activeIndex: {
            type: Number,
            default: 0
        },
        // Function for determining which slides are visible
        // Can be used to show next and prev slides along with the current slide
        activeSlideLogic: {
            type: Function,
            default: (idx, internalIdx) => idx == internalIdx
        },
        swipeEvents: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            timer: null,
            transitionName: "",
            internalIdx: 0
        }
    },
    watch: {
        internalIdx(newIdx) {
            // Emit event to update activeIndex prop
            this.$emit("update:activeIndex", newIdx)
            // Emit slide change event
            this.$emit("slide-change", newIdx)
        }
    },
    created() {
        this.internalIdx = this.activeIndex || 0
    },
    mounted() {
        // Pause slideshow when in a different tab
        document.addEventListener(
            "visibilitychange",
            this.handleVisibilityChange
        )

        if (!this.paused) this.play()
        if (this.swipeEvents) initSwipeEvents(this.$el)
    },
    destroyed() {
        document.removeEventListener(
            "visibilitychange",
            this.handleVisibilityChange
        )
    },
    methods: {
        handleVisibilityChange() {
            if (this.paused) {
                return false
            }
            if (document.visibilityState === "hidden") {
                this.pause()
            } else {
                this.play()
            }
        },
        getLoopedIdx(idx) {
            if (this.wrap)
                return (idx + this.slides.length) % this.slides.length
            else return _clamp(idx, 0, this.slides.length - 1)
        },
        goToNext(clearTimer = true) {
            if (clearTimer) this.pause()
            this.transitionName = this.nextTransitionName
            this.$nextTick(
                () =>
                    (this.internalIdx = this.getLoopedIdx(this.internalIdx + 1))
            )
        },
        goToPrev(clearTimer = true) {
            if (clearTimer) this.pause()
            this.transitionName = this.prevTransitionName
            this.$nextTick(
                () =>
                    (this.internalIdx = this.getLoopedIdx(this.internalIdx - 1))
            )
        },
        pause() {
            clearInterval(this.timer)
        },
        play() {
            clearInterval(this.timer)
            this.timer = setInterval(() => this.goToNext(false), this.timeout)
        },
        goToSlide(slideIdx, clearTimer = true) {
            if (clearTimer) this.pause()
            if (slideIdx > this.internalIdx)
                this.transitionName = this.nextTransitionName
            else this.transitionName = this.prevTransitionName
            this.$nextTick(
                () => (this.internalIdx = this.getLoopedIdx(slideIdx))
            )
        }
    }
}
</script>

<style lang="scss">
.slideshow {
    position: relative;
    overflow: hidden;
    z-index: 0;
    outline: none;

    > .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .nav {
        border: none;
        padding: 0;
        appearance: none;
        z-index: 10;
    }
}
</style>
