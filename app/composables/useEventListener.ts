/**
 * A composable to automatically register and clean up an event listener on a given target.
 *
 * @template T - The type of event to listen for (extends Event).
 * @param {EventTarget | Ref<EventTarget | null>} target - The target to attach the event listener to. Can be a direct EventTarget or a ref to one.
 * @param {string} event - The name of the event to listen for (e.g., 'click', 'keydown').
 * @param {(e: T) => void} handler - The callback function to handle the event.
 * @param {AddEventListenerOptions} [options] - Optional options to pass to `addEventListener`.
 *
 * @example
 * ```ts
 * const button = ref<HTMLElement | null>(null)
 *
 * useEventListener<MouseEvent>(button, 'click', (e) => {
 *   console.log('Button clicked!', e)
 * })
 * ```
 */

export function useEventListener<T extends Event>(
    target: EventTarget | Ref<EventTarget | null>,
    event: string,
    handler: (e: T) => void,
    options?: AddEventListenerOptions
) {
    onMounted(() => {
        const el = unref(target)
        el?.addEventListener(event, handler as EventListener, options)
    })

    onBeforeUnmount(() => {
        const el = unref(target)
        el?.removeEventListener(event, handler as EventListener)
    })
}
