import type { WpImage } from '~/types'

export type WpPageResponse = {
    id: number
    guid: string
    title: string
    content?: string
    excerpt?: string
    excerptRaw?: string
    slug: string
    url: string
    uri: string
    to: string
    status: string
    date: string
    modified: string
    type: string
    author_id: number
    menu_order?: number
    featuredMedia?: WpImage
    children?: WpPageResponse[]

    terms?: {
        postTag?: { name: string }[]
        category?: { name: string }[]
        // Add custom taxonomies here
    }

    next?: WpPageResponse
    prev?: WpPageResponse

    blocks?: any[]

    acf?: {
    // define ACF fields here
        [key: string]: any
    }
}
