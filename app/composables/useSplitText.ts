import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export type SplitType = 'chars' | 'words' | 'lines' | 'chars,words' | 'words,lines' | 'chars,words,lines'

export interface UseSplitTextOptions {
    type?: SplitType
    linesClass?: string
    wordsClass?: string
    charsClass?: string
    mask?: boolean
    observeLines?: boolean
}

export function useSplitText(
    target: Ref<HTMLElement | null>,
    options: UseSplitTextOptions = {}
) {
    const {
        type = 'words',
        linesClass,
        wordsClass,
        charsClass,
        mask = false,
        observeLines = false
    } = options

    let split: SplitText | null = null
    let lineObservers: IntersectionObserver[] = []

    onMounted(() => {
        if (!target.value) return

        split = SplitText.create(target.value, {
            type,
            linesClass,
            wordsClass,
            charsClass,
            propIndex: !!(linesClass || wordsClass || charsClass),
            autoSplit: true,
            aria: 'auto',
            ...(mask && { mask: 'lines' })
        })

        if (observeLines && linesClass) {
            const lineEls = Array.from(target.value.querySelectorAll<HTMLElement>(`.${linesClass}`))

            lineEls.forEach((line) => {
                const parent = line.parentElement

                // Explicitly enforce overflow:hidden + height on the wrapper so
                // translateY(100%) is guaranteed to be clipped — regardless of
                // what GSAP mask does or doesn't set.
                if (parent && parent !== target.value) {
                    parent.style.overflow = 'hidden'
                    parent.style.height = `${line.offsetHeight}px`
                }

                const observeTarget = parent && parent !== target.value ? parent : line

                const observer = new IntersectionObserver(
                    (entries) => {
                        if (!entries[0]?.isIntersecting) return
                        line.classList.add('has-entered')
                        observer.disconnect()
                    },
                    { threshold: 0.1 }
                )
                observer.observe(observeTarget)
                lineObservers.push(observer)
            })
        }
    })

    onUnmounted(() => {
        split?.kill()
        lineObservers.forEach(o => o.disconnect())
        lineObservers = []
    })
}
