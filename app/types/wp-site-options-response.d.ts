import type { WpImage } from '~/types'

export type SocialMediaResponse = {
    platform: string
    url: string
}

export type GoogleAnalyticsResponse = {
    code: string
}

export type WpSiteOptionsResponse = {
    googleAnalytics?: GoogleAnalyticsResponse[]
    socialMedia?: SocialMediaResponse[]
    socialSharedImage?: WpImage
}
