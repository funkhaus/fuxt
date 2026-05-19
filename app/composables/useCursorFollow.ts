// Composable for custom cursor follow effect
const cursorState = reactive({
    isActive: false,
    text: '',
    image: '',
    x: 0,
    y: 0
})

export function useCursorFollow() {
    const show = (text = 'View', image = '') => {
        cursorState.text = text
        cursorState.image = image
        cursorState.isActive = true
    }

    const hide = () => {
        cursorState.isActive = false
    }

    const updatePosition = (x: number, y: number) => {
        cursorState.x = x
        cursorState.y = y
    }

    return {
        cursorState: readonly(cursorState),
        show,
        hide,
        updatePosition
    }
}
