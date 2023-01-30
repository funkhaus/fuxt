// import _get from "lodash/get"
import _isUndefined from "lodash/isUndefined"

/*
 * Allows _get() to try multple paths, else return default
 */
function _getOne(obj, paths, defaultValue) {
    const values = paths
        .map((path) => _get(obj, path))
        .filter((v) => !_isUndefined(v))

    return values.length ? values[0] : defaultValue
}

export default _getOne
