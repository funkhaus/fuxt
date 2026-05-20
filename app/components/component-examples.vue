<template>
    <div class="component-examples">
        <!-- ─── Custom Cursor ──────────────────────────────────────── -->
        <section class="demo-section">
            <h2 class="demo-section__title">
                Custom Cursor
            </h2>

            <!-- Text cursor -->
            <div class="demo-cursor-group">
                <p class="demo-cursor-group__label">
                    Text cursor
                </p>
                <ul class="cursor-list">
                    <li
                        v-for="item in cursorTextItems"
                        :key="item.label"
                        :data-cursor-text="item.cursor"
                        class="cursor-list__item"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>

            <!-- Image cursor -->
            <div class="demo-cursor-group">
                <p class="demo-cursor-group__label">
                    Image cursor
                </p>
                <ul class="cursor-list cursor-list--images">
                    <li
                        v-for="item in cursorImageItems"
                        :key="item.label"
                        :data-cursor-image="item.image"
                        class="cursor-list__item cursor-list__item--image"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>
        </section>

        <!-- ─── GSAP split-text ───────────────────────────────────── -->
        <section class="demo-section">
            <h2 class="demo-section__title">
                GSAP split-text
            </h2>

            <!-- 1. type="words" — word by word fade up -->
            <div class="demo-example">
                <div class="demo-example__meta">
                    <span class="demo-example__name">Word by word</span>
                    <code class="demo-example__props">type="words" words-class="word"</code>
                    <p class="demo-example__desc">
                        Each word gets a <em>--word</em> CSS variable (0, 1, 2…) used to stagger the transition delay.
                    </p>
                </div>
                <split-text
                    v-intersection-observer.once="{ threshold: 0.2 }"
                    tag="h2"
                    type="words"
                    words-class="word"
                    class="st-words"
                >
                    Every word fades up one after another as you scroll into view.
                </split-text>
            </div>

            <!-- 2. type="chars" — typing effect -->
            <div class="demo-example">
                <div class="demo-example__meta">
                    <span class="demo-example__name">Typing / letter reveal</span>
                    <code class="demo-example__props">type="chars" chars-class="char"</code>
                    <p class="demo-example__desc">
                        Each character gets a <em>--char</em> index. <em>step-end</em> makes opacity snap instantly — no fade, pure typing feel.
                    </p>
                </div>
                <split-text
                    v-intersection-observer.once="{ threshold: 0.2 }"
                    tag="h2"
                    type="chars"
                    chars-class="char"
                    class="st-chars"
                >
                    Crafting digital experiences one pixel at a time.
                </split-text>
            </div>

            <!-- 3. type="lines" — all lines staggered, trigger together -->
            <div class="demo-example">
                <div class="demo-example__meta">
                    <span class="demo-example__name">Line by line (parent trigger)</span>
                    <code class="demo-example__props">type="lines" lines-class="line"</code>
                    <p class="demo-example__desc">
                        Lines are calculated from the actual rendered layout, so reflow on resize is handled automatically. All lines trigger together when the parent enters the viewport, staggered by <em>--line</em>.
                    </p>
                </div>
                <split-text
                    v-intersection-observer.once="{ threshold: 0.2 }"
                    tag="p"
                    type="lines"
                    lines-class="line"
                    :mask="false"
                    class="st-lines"
                >
                    Design is not just what it looks like and feels like. Design is how it works.
                    Every decision shapes the experience, from the first pixel to the last interaction.
                    Good design is invisible — it gets out of the way and lets the content speak.
                </split-text>
            </div>

            <!-- 4. type="lines" + mask — lines clip from below -->
            <div class="demo-example">
                <div class="demo-example__meta">
                    <span class="demo-example__name">Line by line + mask</span>
                    <code class="demo-example__props">type="lines" lines-class="line" :mask="true"</code>
                    <p class="demo-example__desc">
                        <em>mask=true</em> wraps each line in an <em>overflow:hidden</em> container. The line slides up inside its own clip — no visible origin below.
                    </p>
                </div>
                <split-text
                    v-intersection-observer.once="{ threshold: 0.2 }"
                    tag="p"
                    type="lines"
                    lines-class="line"
                    :mask="true"
                    class="st-lines-mask"
                >
                    Design is not just what it looks like and feels like. Design is how it works.
                    Every decision shapes the experience, from the first pixel to the last interaction.
                    Good design is invisible — it gets out of the way and lets the content speak.
                </split-text>
            </div>

            <!-- 5. type="lines" + mask + observeLines — each line triggers on scroll -->
            <div class="demo-example">
                <div class="demo-example__meta">
                    <span class="demo-example__name">Line by line + mask + per-line scroll trigger</span>
                    <code class="demo-example__props">type="lines" lines-class="line" :mask="true" :observe-lines="true"</code>
                    <p class="demo-example__desc">
                        <em>observe-lines=true</em> attaches a separate <em>IntersectionObserver</em> to each line. Each line only animates when it individually enters the viewport.
                    </p>
                </div>
                <split-text
                    tag="p"
                    type="lines"
                    lines-class="line"
                    :mask="true"
                    :observe-lines="true"
                    class="st-lines-observe"
                >
                    Design is not just what it looks like and feels like. Design is how it works.
                    Every decision shapes the experience, from the first pixel to the last interaction.
                    Good design is invisible — it gets out of the way and lets the content speak.
                    The best interfaces feel inevitable, as though no other design could exist.
                    Simplicity is not the absence of clutter but the presence of order and intention.
                </split-text>
            </div>

            <!-- 6. type="words,lines" — word-aware, line-aware stagger -->
            <div class="demo-example">
                <div class="demo-example__meta">
                    <span class="demo-example__name">Words + lines kombinacija</span>
                    <code class="demo-example__props">type="words,lines" words-class="word" lines-class="line"</code>
                    <p class="demo-example__desc">
                        Combines both <em>--word</em> and <em>--line</em> indexes. Words in later lines get a larger delay, creating a natural cascading stagger across the whole block.
                    </p>
                </div>
                <split-text
                    v-intersection-observer.once="{ threshold: 0.2 }"
                    tag="p"
                    type="words,lines"
                    words-class="word"
                    lines-class="line"
                    class="st-words-lines"
                >
                    Each word knows which line it belongs to. This lets you build stagger effects
                    that span across lines with full control over timing and sequence.
                </split-text>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const cursorTextItems = [
    { label: 'Brand Strategy', cursor: 'Explore' },
    { label: 'Digital Design', cursor: 'View' },
    { label: 'Web Development', cursor: 'Open' },
    { label: 'Empty text (shows default cursor)', cursor: '' }
]

const cursorImageItems = [
    {
        // External URL
        label: 'External URL',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80'
    },
    {
        // File from /public
        label: 'Public file (favicon)',
        image: '/favicon.png'
    },
    {
        // Wrong URL — cursor won't show (failedImages guard)
        label: 'Wrong URL - custom cursor won\'t show',
        image: 'https://images.udsnsplash.com/photo-1506905925346-21bddsda4d32df4?w=700&q=80'
    }
]
</script>

<style scoped>
.component-examples {
    .demo-section {
        padding: 60px 40px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .demo-section__title {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            opacity: 0.4;
            margin-bottom: 32px;
        }
    }

    /* ── Custom cursor ─────────────────────────────────────────── */

    .demo-cursor-group {
        margin-bottom: 40px;

        &:last-child {
            margin-bottom: 0;
        }

        .demo-cursor-group__label {
            font-size: 12px;
            opacity: 0.5;
            margin-bottom: 12px;
        }
    }

    .cursor-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        max-width: 400px;

        .cursor-list__item {
            padding: 18px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            font-size: 22px;
            font-weight: 500;
            transition: opacity 0.2s var(--easing-authentic-motion);

            &:first-child {
                border-top: 1px solid rgba(0, 0, 0, 0.08);
            }

            &:hover {
                opacity: 0.5;
            }
        }

        &.cursor-list--images .cursor-list__item--image {
            font-size: 18px;
            font-weight: 400;
            padding: 22px 0;
        }
    }

    /* ── split-text demos ──────────────────────────────────────── */

    .demo-example {
        margin-bottom: 60px;
        max-width: 600px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .demo-example__meta {
        margin-bottom: 16px;

        .demo-example__name {
            display: block;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .demo-example__props {
            display: block;
            font-size: 11px;
            opacity: 0.45;
            margin-bottom: 8px;
            font-family: monospace;
        }

        .demo-example__desc {
            font-size: 13px;
            line-height: 1.6;
            opacity: 0.6;
            max-width: 480px;

            em {
                font-style: normal;
                font-family: monospace;
                opacity: 0.9;
            }
        }
    }

    /* 1. Words */
    .st-words {
        :deep(.word) {
            display: inline-block;
            opacity: 0;
            transform: translateY(24px);
            transition:
                opacity 0.5s var(--easing-authentic-motion),
                transform 0.5s var(--easing-authentic-motion);
            transition-delay: calc(var(--word) * 0.06s);
        }

        &.has-entered :deep(.word) {
            opacity: 1;
            transform: none;
        }
    }

    /* 2. Chars — typing */
    .st-chars {
        :deep(.char) {
            display: inline-block;
            opacity: 0;
            transition: opacity 0.01s step-end;
            transition-delay: calc(var(--char) * 0.04s);
        }

        &.has-entered :deep(.char) {
            opacity: 1;
        }
    }

    /* 3. Lines — all trigger together, stagger by --line */
    .st-lines {
        :deep(.line) {
            display: block;
            transform: translateY(100%);
            transition: transform 0.8s var(--easing-authentic-motion);
            transition-delay: calc(var(--line) * 0.18s);
        }

        &.has-entered :deep(.line) {
            transform: none;
        }
    }

    /* 4. Lines + mask — clip reveal from below */
    .st-lines-mask {
        :deep(.line) {
            display: block;
            transform: translateY(100%);
            transition: transform 0.9s var(--easing-authentic-motion);
            transition-delay: calc(var(--line) * 0.18s);
        }

        &.has-entered :deep(.line) {
            transform: none;
        }
    }

    /* 5. Lines + mask + per-line observer */
    .st-lines-observe {
        :deep(.line) {
            display: block;
            transform: translateY(100%);
            transition: transform 0.9s var(--easing-authentic-motion);
            transition-delay: calc(var(--line) * 0.1s);
        }

        :deep(.line.has-entered) {
            transform: none;
            transition-delay: calc(var(--line) * 0.1s);
        }
    }

    /* 6. Words + lines — delay grows across lines */
    .st-words-lines {
        :deep(.word) {
            display: inline-block;
            opacity: 0;
            transform: translateY(16px);
            transition:
                opacity 0.5s var(--easing-authentic-motion),
                transform 0.5s var(--easing-authentic-motion);
            transition-delay: calc((var(--line) * 0.2s) + (var(--word) * 0.04s));
        }

        &.has-entered :deep(.word) {
            opacity: 1;
            transform: none;
        }
    }
}
</style>
