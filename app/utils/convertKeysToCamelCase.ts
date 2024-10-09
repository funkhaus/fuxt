// Convert object keys to camelCase
// TODO Fix typescript errors in this
function convertKeysToCamelCase(obj: unknown): unknown {
    if (_IsPlainObject(obj)) {
        const n = {}
        Object.keys(obj as object).forEach(k => (n[_CamelCase(k)] = convertKeysToCamelCase((obj as object)[k])))
        return n
    }
    else if (_IsArray(obj)) obj.map(i => convertKeysToCamelCase(i))
    return obj
}

export default convertKeysToCamelCase
