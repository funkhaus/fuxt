// Convert object keys to camelCase
// TODO Fix typescript errors in this
function keysToCamelCase(obj: unknown): unknown {
    if (Array.isArray(obj)) {
        return obj.map(v => keysToCamelCase(v));
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [_CamelCase(key)]: keysToCamelCase(obj[key]),
            }),
            {},
        );
    }
    return obj;
}

export default keysToCamelCase
