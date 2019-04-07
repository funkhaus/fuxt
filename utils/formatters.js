import _get from 'lodash/get'

export const formatPageData = queryData => {
    return _get(queryData, 'pages.edges[0].node', false)
}
