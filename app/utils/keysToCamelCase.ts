// Convert object keys to camelCase
// TODO Fix typescript errors in this
const keysToCamelCase = (obj: unknown): unknown => {
    if (Array.isArray(obj)) {
        return obj.map(v => keysToCamelCase(v))
    }
    else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [_CamelCase(key)]: keysToCamelCase((obj as Record<string, unknown>)[key])
            }),
            {}
        )
    }
    return obj
}

export default keysToCamelCase
