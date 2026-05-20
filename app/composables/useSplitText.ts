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
    threshold?: number
    once?: boolean
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
        observeLines = false,
        threshold = 0.1,
        once = true
    } = options

    let split: SplitText | null = null
    let lineObservers: IntersectionObserver[] = []
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const hasEntered = ref(false)

    const setupLineObservers = () => {
        if (!target.value || !linesClass) return

        lineObservers.forEach(o => o.disconnect())
        lineObservers = []

        const lineEls = Array.from(target.value.querySelectorAll<HTMLElement>(`.${linesClass}`))

        lineEls.forEach((line) => {
            const parent = line.parentElement
            const observeTarget = parent && parent !== target.value ? parent : line

            const observer = new IntersectionObserver(
                (entries) => {
                    const isIntersecting = entries[0]?.isIntersecting
                    if (isIntersecting) {
                        line.classList.add('has-entered')
                        if (!hasEntered.value) hasEntered.value = true
                        if (once) observer.disconnect()
                    }
                    else if (!once) {
                        line.classList.remove('has-entered')
                    }
                },
                { threshold }
            )
            observer.observe(observeTarget)
            lineObservers.push(observer)
        })
    }

    const doSplit = () => {
        if (!target.value) return

        const alreadyAnimated = linesClass
            ? !!target.value.querySelector(`.${linesClass}.has-entered`)
            : false

        split?.revert()

        split = SplitText.create(target.value, {
            type,
            linesClass,
            wordsClass,
            charsClass,
            propIndex: !!(linesClass || wordsClass || charsClass),
            aria: 'auto',
            ...(mask && { mask: 'lines' })
        })

        if (observeLines && linesClass) {
            if (alreadyAnimated) {
                const lines = Array.from(target.value.querySelectorAll<HTMLElement>(`.${linesClass}`))
                lines.forEach((line) => {
                    line.style.transition = 'none'
                    line.classList.add('has-entered')
                })
                requestAnimationFrame(() => {
                    lines.forEach((line) => {
                        line.style.transition = ''
                    })
                })
            }
            else {
                nextTick(() => requestAnimationFrame(setupLineObservers))
            }
        }
    }

    const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer)
        resizeTimer = setTimeout(doSplit, 150)
    }

    onMounted(() => {
        doSplit()
        window.addEventListener('resize', onResize)
    })

    onUnmounted(() => {
        if (resizeTimer) clearTimeout(resizeTimer)
        window.removeEventListener('resize', onResize)
        split?.kill()
        lineObservers.forEach(o => o.disconnect())
        lineObservers = []
    })

    return { hasEntered }
}
