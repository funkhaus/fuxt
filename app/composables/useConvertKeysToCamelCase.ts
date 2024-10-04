// Convert object keys to camelCase
export function useConvertKeysToCamelCase(obj: unknown): unknown {
    if (isPlainObject(obj)) {
        const n = {}
        Object.keys(obj as object).forEach(k => (n[useCamelCase(k)] = useConvertKeysToCamelCase((obj as object)[k])))
        return n
    }
    else if (isArray(obj)) obj.map(i => useConvertKeysToCamelCase(i))
    return obj
}
