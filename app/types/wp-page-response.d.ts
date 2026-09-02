import type { WpImage } from '~/types'
import type { YoastHeadJson } from '~/composables/useYoastHead'

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

    // Yoast's head payload, kept in Yoast's own snake_case by useWpFetch's transform.
    // Null when Yoast is active but the post is not indexable; absent when Yoast is off.
    // Only ever set on the top-level entity — nested children/next/prev never carry it.
    yoastHeadJson?: YoastHeadJson | null

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
