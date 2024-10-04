// Convert object keys to camelCase
// TODO Fix typescript errors in this
export function useConvertKeysToCamelCase(obj: unknown): unknown {
    if (_IsPlainObject(obj)) {
        const n = {}
        Object.keys(obj as object).forEach(k => (n[_CamelCase(k)] = useConvertKeysToCamelCase((obj as object)[k])))
        return n
    }
    else if (_IsArray(obj)) obj.map(i => useConvertKeysToCamelCase(i))
    return obj
}
