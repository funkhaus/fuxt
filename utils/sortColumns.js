/*
 * Take array of items and sort equally across n new arrays. Great for sorting items into columns.
 */
function sortColumns(items, count = 2) {
    const buckets = Array(count)
        .fill(0)
        .map((v) => [])
    let pointer = 0

    items.forEach((item) => {
        buckets[pointer].push(item)
        pointer = (pointer + 1) % count
    })

    return buckets
}

export default sortColumns
