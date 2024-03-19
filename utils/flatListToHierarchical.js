/*
 * This function transform a flat list of WordPress menu items into a hierarchical tree
 * SEE: https://www.wpgraphql.com/docs/menus#hierarchical-data
 */
function flatListToHierarchical(
    data = [],
    { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) {
    const tree = []
    const childrenOf = {}
    data.forEach((item) => {
        const newItem = { ...item }
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
        childrenOf[id] = childrenOf[id] || []
        newItem[childrenKey] = childrenOf[id]
        parentId
            ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
            : tree.push(newItem)
    })
    return tree
}

export default flatListToHierarchical
