import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export type SplitType = 'chars' | 'words' | 'lines' | 'chars,words' | 'words,lines' | 'chars,words,lines'

export interface UseSplitTextOptions {
    type?: SplitType
    linesClass?: string
    wordsClass?: string
    charsClass?: string
}

export function useSplitText(
    target: Ref<HTMLElement | null>,
    options: UseSplitTextOptions = {}
) {
    const {
        type = 'words',
        linesClass,
        wordsClass,
        charsClass
    } = options

    let split: SplitText | null = null

    onMounted(() => {
        if (!target.value) return

        split = SplitText.create(target.value, {
            type,
            linesClass,
            wordsClass,
            charsClass,
            // adds --line / --word / --char CSS vars when a class is provided
            propIndex: !!(linesClass || wordsClass || charsClass),
            autoSplit: true,
            aria: 'auto'
        })
    })

    onUnmounted(() => {
        split?.kill()
    })
}
