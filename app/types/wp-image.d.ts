export type WpImage = {
    id: number
    src: string
    width: number
    height: number
    alt?: string
    caption?: string
    title?: string
    description?: string
    mime_type: string
    html: string
    srcset: string
    sizes: string
    blurhash: string
    meta: {
        width: number
        height: number
        file: string
        filesize: number
        sizes: {
            medium: {
                file: string
                width: number
                height: number
                mime_type: string
                filesize: number
            }
            large: {
                file: string
                width: number
                height: number
                mime_type: string
                filesize: number
            }
            thumbnail: {
                file: string
                width: number
                height: number
                mime_type: string
                filesize: number
            }
            medium_large: {
                file: string
                width: number
                height: number
                mime_type: string
                filesize: number
            }
            post_thumbnail: {
                file: string
                width: number
                height: number
                mime_type: string
                filesize: number
            }
            social_preview: {
                file: string
                width: number
                height: number
                mime_type: string
                filesize: number
            }
            small_preview: {
                file: string
                width: number
                height: number
                mime_type: string
                filesize: number
            }
        }
        image_meta?: {
            aperture: string
            credit: string
            camera: string
            caption: string
            created_timestamp: string
            copyright: string
            focal_length: string
            iso: string
            shutter_speed: string
        }
    }
    acf?: {
        videoUrl: string
        focalPointX: number
        focalPointY: number
        blurhash: string
    }
}

export type WpImageProps = {
    image?: WpImage
    disabled?: boolean
    loop?: boolean
    autoplay?: boolean
    muted?: boolean
    aspectRatio?: (string | number)
    mode?: string
    objectFit?: 'cover' | 'contain'
    sizes?: string
}
